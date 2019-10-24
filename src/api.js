import { firebase, firestore } from './firebase-connection.js'

export {
  addBookComment,
  addBookToFav,
  getBookComments,
  getFavsBooks,
  getUserReviews,
  removeBookFromFav
}

async function addBookComment({ book, user, comment }) {
  const docId = firestore.collection('comments').doc();
  const { photoURL, displayName } = user.providerData[0];
  await docId.set({
    id: book.slug,
    title: book.title,
    picture: photoURL,
    name: displayName,
    userId: user.uid,
    date: firebase.firestore.FieldValue.serverTimestamp(),
    comment,
  });
}

async function addBookToFav({ book, user }) {
  const docId = firestore.collection('favorites').doc();
  await docId.set({
    slug: book.slug,
    title: book.title,
    rating: book.rating,
    author: book.author,
    userId: user.uid,
    added: firebase.firestore.FieldValue.serverTimestamp()
  });
}

async function getBookComments({ book }) {
  const query = firestore.collection('comments').where('id', '==', book.slug);
  const snap = await query.get();
  if (snap.empty) {
    return [];
  } else {
    const bookComments = [];
    for (let book of snap.docs) {
      bookComments.push(book.data());
    }
    return bookComments
  }
}

async function getFavsBooks({ user }) {
  if (!user) return;
  const query = firestore.collection('favorites').where('userId', '==', user.uid);
  const snap = await query.get();
  if (snap.empty) {
    return [];
  } else {
    const books = [];
    for (let book of snap.docs) {
      books.push(book.data());
    }
    return books;
  }
}

async function getUserReviews({ user }) {
  if (!user) return;
  const query = firestore.collection('comments').where('userId', '==', user.uid);
  const snap = await query.get();
  if (snap.empty) {
    return [];
  } else {
    const reviews = [];
    for (let review of snap.docs) {
      reviews.push(review.data());
    }
    return reviews;
  }
}

async function removeBookFromFav({ book, user }) {
  const ref = firestore.collection('favorites')
      .where('userId', '==', user.uid)
      .where('slug', '==', book.slug);
  const doc = await ref.get();
  if (!doc.empty) {
    await doc.docs[0].ref.delete();
  }
}

