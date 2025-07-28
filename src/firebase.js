import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyC1sejPFgIa6xZGToPttFGJcuAohVn_m9k',
	authDomain: 'todosproject-da57b.firebaseapp.com',
	projectId: 'todosproject-da57b',
	storageBucket: 'todosproject-da57b.firebasestorage.app',
	messagingSenderId: '757909812393',
	appId: '1:757909812393:web:ac1ea2751f354cf1fe65b8',
	databaseURL:
		'https://todosproject-da57b-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
