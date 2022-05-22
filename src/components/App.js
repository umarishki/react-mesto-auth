import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletionPopup from './ConfirmDeletionPopup';
import { initialButtonTitleValue } from '../utils/constants';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmDeletionPopupOpen, setIsConfirmDeletionPopupOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCardToDelete, setSelectedCardToDelete] = useState(null);
    const [currentUser, setCurrentUser] = useState({});

    const [buttonTitle, setButtonTitle] = useState(initialButtonTitleValue);

    useEffect(() => {
        Promise.all([api.getProfileInfo(), api.getInitialCards()])
            .then(([userData, cards]) => {
                setCurrentUser(userData);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleUpdateUser(data) {
        setButtonTitle('Сохранение...');
        api.patchProfileInfo(data)
            .then((userInfo) => {
                setCurrentUser(userInfo);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setButtonTitle(initialButtonTitleValue);
                closeAllPopups();
            });
    }

    function handleUpdateAvatar(data) {
        setButtonTitle('Сохранение...');
        api.patchProfileAvatar(data)
            .then((userInfo) => {
                setCurrentUser(userInfo);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setButtonTitle(initialButtonTitleValue);
                closeAllPopups();
            });
    }

    function handleAddPlaceSubmit(data) {
        setButtonTitle('Сохранение...');
        api.postNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setButtonTitle(initialButtonTitleValue);
                closeAllPopups();
            });
    }

    function handleCardDelete(card) {
        setButtonTitle('Сохранение...');
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setButtonTitle(initialButtonTitleValue);
                closeAllPopups();
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleDeleteCard = (card) => {
        setIsConfirmDeletionPopupOpen(true);
        setSelectedCardToDelete(card);
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsConfirmDeletionPopupOpen(false);
        setSelectedCard(null);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
            <Main
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardDeleteWithConfirmation={handleDeleteCard}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
            />
            <Footer />
            <EditProfilePopup
                buttonTitle={buttonTitle}
                onUpdateUser={handleUpdateUser}
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
            />
            <EditAvatarPopup
                buttonTitle={buttonTitle}
                onUpdateAvatar={handleUpdateAvatar}
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
            />
            <AddPlacePopup
                buttonTitle={buttonTitle}
                onAddPlace={handleAddPlaceSubmit}
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
            />
            <ConfirmDeletionPopup
                buttonTitle={buttonTitle}
                card={selectedCardToDelete}
                onDeleteCard={handleCardDelete}
                isOpen={isConfirmDeletionPopupOpen}
                onClose={closeAllPopups}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
    );
}

export default App;