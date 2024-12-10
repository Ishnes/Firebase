
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCKlFlmR1C5y-n1Q8MFY06glJlnwP6oSo4",
    authDomain: "test-ba24c.firebaseapp.com",
    projectId: "test-ba24c",
    storageBucket: "test-ba24c.firebasestorage.app",
    messagingSenderId: "385819042329",
    appId: "1:385819042329:web:337cac20ed1faa6c810088",
    measurementId: "G-BTRJPB6L9T"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  
  // Dodaj dane do Firestore
db.collection('users').add({
    name: 'Jan Kowalski',
    email: 'jan@example.com'
  })
  .then((docRef) => {
    console.log("Dokument zapisany z ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Błąd dodawania dokumentu: ", error);
  });
  
  // Odczyt danych z Firestore
db.collection('users').get()
.then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
})
.catch((error) => {
  console.log("Błąd odczytu danych: ", error);
});
