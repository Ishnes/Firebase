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
