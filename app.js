// Konfiguracja Firebase
const firebaseConfig = {
    apiKey: "TWOJE_API_KEY",
    authDomain: "TWOJE_AUTH_DOMAIN",
    projectId: "TWOJE_PROJECT_ID",
    storageBucket: "TWOJE_STORAGE_BUCKET",
    messagingSenderId: "TWOJE_MESSAGING_SENDER_ID",
    appId: "TWOJE_APP_ID"
  };
  
  // Inicjalizacja Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Funkcja zapisująca dane do Firestore
  document.getElementById('saveDataBtn').addEventListener('click', function() {
      db.collection('dane')
        .add({
            name: "Test",
            age: 25
        })
        .then(() => {
            alert("Dane zapisane!");
        })
        .catch((error) => {
            console.error("Błąd zapisania danych: ", error);
        });
  });
  