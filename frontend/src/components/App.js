import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

import success from "../images/success.svg";
import fail from "../images/fail.svg";

import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";

import CurrentUserContext from "../contexts/CurrentUserContext";
import { api } from "../utils/Api.js";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const confirm = {
    text: "Вы успешно зарегистрировались!",
    src: success,
    alt: "Выполнено",
  };
  const notConfirm = {
    text: "Что-то пошло не так! Попробуйте ещё раз.",
    src: fail,
    alt: "Ошибка",
  };

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState([]);

  const [isloggedIn, setIsloggedIn] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [emailUser, setEmailUser] = useState("");
  const [isDataInfoToolTip, setIsDataInfoToolTip] = useState(confirm);

  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (isloggedIn) {
      api
        .getInitialData()
        .then(([dataUser, cardsServer]) => {
          setCurrentUser(dataUser);
          setCards(cardsServer);
        })
        .catch((err) => console.log("Error getInitialData!"));
    }
  }, [isloggedIn]);

  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            console.log(res)
            setEmailUser(res.email);
            setIsloggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleSubmitLogin({ email, password }) {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setIsDataInfoToolTip(confirm);
          setIsloggedIn(true);
          setEmailUser(email);
          navigate("/", { replace: true });
        } else {
          return;
        }
      })
      .catch((err) => {
        setIsDataInfoToolTip(notConfirm);
        setIsInfoToolTipOpen(true);
        console.log(err);
      });
  }

  function handleSubmitRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        setIsDataInfoToolTip(confirm);
        setIsInfoToolTipOpen(true);
        navigate("/sign-in", { replace: true });
      })
      .catch(() => {
        setIsDataInfoToolTip(notConfirm);
        setIsInfoToolTipOpen(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setEmailUser("");
    setIsloggedIn(false);
    setIsShow(true);
    navigate("/sign-in", { replace: true });
  }

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setIsConfirmationPopupOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .setLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log("Error like card", err));
    } else {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log("Error like card", err));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        setIsConfirmationPopupOpen(false);
      })
      .catch((err) => console.log("Error delete card :" + err));
  }

  function handleUpdateUser(value) {
    api
      .editProfile(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log("Error update info :" + err));
  }

  function handleUpdateAvatar(value) {
    api
      .newAvatar(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(value) {
    api
      .addCard(value)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log("Error add card :", err));
  }

  const handleTrashClick = (card) => {
    setCardToDelete(card);
    setIsConfirmationPopupOpen(!isConfirmationPopupOpen);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={emailUser} onSignOut={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                isloggedIn={isloggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleTrashClick}
              />
            }
          />
          // для регистрации пользователя
          <Route
            path="/sign-up"
            element={
              <Register isShow={isShow} onSubmit={handleSubmitRegister} />
            }
          />
          // для авторизации пользователя
          <Route
            path="/sign-in"
            element={<Login onSubmit={handleSubmitLogin} />}
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={cardToDelete}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}></ImagePopup>

        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          isShow={isShow}
          dataInfo={isDataInfoToolTip}
        />

        <Footer isloggedIn={isloggedIn} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
