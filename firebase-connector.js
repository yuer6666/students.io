import { getDatabase, ref, set, update, child, get, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js'
const firebaseConfig = {
    // ...
    // The value of `databaseURL` depends on the location of the database
    "type": "service_account",
    "project_id": "student-questions-3b9de",
    "private_key_id": "a75c05a2aadacdfb9fc99735e74f18d0d29bab8c",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQSol5FTttq99u\nnv6BhY6CWZrbPEjoihMI5jBRXaiE2zZLmyBcTQeKnwPqO7m0Ph15tcfRfxmhD3GK\nIv59PWBIybqxn4+eNPkX21Uac1NDBi9Yx1EB/W1U24mQ8wd6eIVcvZfjriJyuhFQ\nqGhjH8Ow3N+BTRVZfZOpLlr3mGp8aS1DCSKOSUUFC+8s0CSi1Ap1P23/HVfNe2iM\n3zSQj8c7ebOJHJ3MnyTVkCnQBz7IFdXEzZitQIIT2EMVQyjwry9QN+NYD/xGM7wO\nenAE3pLkrD4QCYihHwfmqShOFG4y7XdERl2juMUBUuA6Hs9j8eTGbEd8rsI3Ihwx\n3eb7NpWBAgMBAAECggEAEfVjPfPVMGMBvCVsNxmfTGDSZ7WeaaJB+uHx54oGNhI6\nb7FbzGl9zXdhXIgyvjYez3gbVtY5DPhqZykWPREWJKBz/s2NkevqUCLChynLU3uM\niICC3QOPMiJNjZhOnEIY6YKVPnWslayyQnyKp4U9F5orkRfmz9TybsNG55MWF0zI\nND0V/yTfw2plmDhfJXwwfKoK6/SzJW3atEf7W1vp8mbJyWJffntLCiN45MGrX+iH\nsYMYvDGpZT2M6KYzL4rt7lUViTGg7FcnPn5SU6E+niFoDTrFF1PrJpQkBAIHXJT1\nDr1/GLSd3lj6AQVXZWP4a1/IpNKJi4glf+kiiDmLywKBgQD9EayrW+pmkhkuKV7i\nKH1y9xLvLUkB8edkE3GXy9QW/zcbsQIjh+IOwbB2IUGprC79EAdhARfIQbmbzPMb\nnM/ULxBurjxGpJl7+MwRiEUL/uUesz3jRaCLoz5cyQxMeAdYL3RznpajwVGVK67A\nCduL78EHBAFKp9anA+OCQliGPwKBgQDStBmybG+Lr1su5a2XHY8/cqRkogyOHyEG\nh5PpgD3FG2cfqbQAZxcKMB8VSJT2phDc6uyUiTuo27RQbB84T8/50tetpTiTz9sx\nN7+At6cKG83GMdTCsDzt0oCJl9TlmrencU8lhRzB/xD5xy3IDYbTvMR8fyXrFhIT\nnHM0KSd0PwKBgQC8xo1uOh9tKfh8lcHApIGH28SVA8vdFo0L+vEWUabBDNoX3v+A\nb6FybotqYz5vChD3FxjaBI2wBU8maEjExUHGvuDcHz65V5lif+ICBguzeg2BzCUT\nPuIWp8wiPJrfA/4+iw+sG5W1S8TGqJIvkGrkRRFRYWxxOygE6AKzLTiJ0wKBgHuO\nj08Y1WSFRSRAHUZzWBAtywcUG+avjG9Gy87um8pdImDn5B0kVtdrlp6lfG0Svuq9\nfFQyEWEYzSkn7jrYWq42HLHAJGhRSEkZVtxFVdfQrB9gE1LDhEc13JhTB85Ipw+y\nm2X2JAIC79J5IXihrgG2PUaATR0JSTpk0Q2yYGeDAoGBANRzR6C6fVLyEozCFmSX\nz+Iii/Xt9A5OZtq0T1SGd7IBr7gDGMMh5PX+kKFysOR+cmGBxmChS3rkMofhvcw9\nXIhiQl9CjggBlmCF3Q70JmWtu6IxXAxYPHn2w1UB3E3OGcHIxxXwYiqP0FhP0p3v\nUN96JJgTRfFXO0NcUcECPv21\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-zx63p@student-questions-3b9de.iam.gserviceaccount.com",
    "client_id": "104443098985906721027",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zx63p%40student-questions-3b9de.iam.gserviceaccount.com",
    // databaseURL: "https://map-project-232803-default-rtdb.firebaseio.com"
    databaseURL: "https://student-questions-3b9de-default-rtdb.firebaseio.com"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const dbRef = ref(getDatabase(app))

get(child(dbRef, `users`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});

// function writeUserData() {
//     const db = getDatabase();
//     set(ref(db, 'questions/' + 'json'), {
//         question: 'teste',
//         image: 'test',
//         answer: 'aa'
//     });
// }

// writeUserData()