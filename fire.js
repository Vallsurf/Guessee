const firebaseconfig = require('./config')
const firebase = require('firebase');

require('firebase/firestore'); 

const collectionImages = 'images' //should be a var from config file

class Fire{
    constructor(){
        firebase.initializeApp(firebaseconfig);
        firebase.auth().onAuthStateChanged(async user => {
            if(!user){
                await firebase.auth().signInAnonymously();
            }
            console.log('user id:', user.uid)
        }) 
        
            firebase.firestore().settings({ timestampsInSnapshots: true });
    } 

getimage = async (imgurl) => {
    var storage = firebase.storage(); 
    var storageRef = storage.ref();
    var imagesRef = storageRef.child('images/steven-erixon-738508-unsplash.jpg');
    
    const url = await imagesRef.getDownloadURL()
    console.log(url)
    return url; 
}

getData = async () => {
    var img = {}; 
    var test = []; 
    var data = await firebase.firestore().collection(collectionImages).get().then(doc => 
        doc.forEach(record => {
            const link = record.data().link 
            const phrase = record.data().phrase
            test.push({link: link, phrase: phrase})
    }));
    
    return test
    
    
}
}

Fire.shared = new Fire();
export default Fire; 