// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, addDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKlFlmR1C5y-n1Q8MFY06glJlnwP6oSo4",
  authDomain: "test-ba24c.firebaseapp.com",
  projectId: "test-ba24c",
  storageBucket: "test-ba24c.appspot.com",
  messagingSenderId: "385819042329",
  appId: "1:385819042329:web:337cac20ed1faa6c810088",
  measurementId: "G-BTRJPB6L9T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Przykład: Zapis danych do kolekcji "users"
const saveUser = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "Jan Kowalski",
      email: "jan@example.com"
    });
    console.log("Dokument zapisany z ID: ", docRef.id);
  } catch (error) {
    console.error("Błąd dodawania dokumentu: ", error);
  }
};
saveUser();

// Tworzenie dostawcy Google
const provider = new GoogleAuthProvider();

// Funkcja logowania przez Google
const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user; // Dane zalogowanego użytkownika
    console.log("Zalogowany użytkownik:", user);

    // Zapisz dane użytkownika w Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      lastLogin: new Date(),
    });

    alert("Zalogowano pomyślnie!");
  } catch (error) {
    console.error("Błąd podczas logowania:", error);
    alert("Błąd logowania: " + error.message);
  }
};

// Funkcja wylogowania
const logout = async () => {
  try {
    await signOut(auth);
    alert("Wylogowano pomyślnie!");
  } catch (error) {
    console.error("Błąd podczas wylogowania:", error);
  }
};

// Podłączenie funkcji do przycisków
document.getElementById("google-login").addEventListener("click", loginWithGoogle);
