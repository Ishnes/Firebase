// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getDocs} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

// Tworzenie dostawcy Google
const provider = new GoogleAuthProvider();

// Funkcja logowania przez Google
const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user; // Dane zalogowanego użytkownika
    console.log("Zalogowany użytkownik:", user);

    // Poproś użytkownika o nick
    const nick = prompt("Podaj swój nick:");
    if (!nick) {
      alert("Nick jest wymagany do zapisania się na tablicę wyników!");
      return;
    }

    // Zapisz dane użytkownika w Firestore w kolekcji "user"
    await setDoc(doc(db, "user", user.uid), {
      name: nick,
      email: user.email,
      photoURL: user.photoURL,
      score: 0, // Początkowy wynik
      lastLogin: new Date(),
    });

    alert(`Witaj ${nick}, zostałeś zapisany na tablicę wyników!`);
    displayMessage(`Zalogowano jako: ${nick}`);
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
    displayMessage("Użytkownik wylogowany.");
  } catch (error) {
    console.error("Błąd podczas wylogowania:", error);
    alert("Błąd wylogowania: " + error.message);
  }
};

// Funkcja wyświetlania wiadomości
const displayMessage = (message) => {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.textContent = message;
};

// Podłączenie funkcji do przycisków
document.getElementById("google-login").addEventListener("click", loginWithGoogle);
document.getElementById("logout").addEventListener("click", logout);



const populateLeaderboard = async () => {
    try {
        const leaderboardTable = document.querySelector("#user tbody");
        leaderboardTable.innerHTML = ""; // Wyczyść tabelę przed ponownym załadowaniem

        const querySnapshot = await getDocs(collection(db, "users"));
        console.log("Pobrane dokumenty:", querySnapshot.size);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log("Dane użytkownika:", data);

            // Utwórz nowy wiersz tabeli
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${data.name || "Anonim"}</td>
                <td>${data.score || 0}</td>
            `;
            leaderboardTable.appendChild(row);
        });
    } catch (error) {
        console.error("Błąd podczas pobierania danych z Firestore:", error);
    }
};


// Wywołaj funkcję po zalogowaniu
document.getElementById("google-login").addEventListener("click", async () => {
    await loginWithGoogle();
    populateLeaderboard(); // Uzupełnij tabelę po zalogowaniu
});

// Wywołaj funkcję przy każdym ładowaniu strony
populateLeaderboard();
