import { getDatabase, ref, set, update, child, get, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js'
const firebaseConfig = {
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
    databaseURL: "https://student-questions-3b9de-default-rtdb.firebaseio.com"
};

// Initialize Firebase
function initDB() {
    const app = initializeApp(firebaseConfig);
    const dbRef = ref(getDatabase(app))
    window.db = getDatabase(app)
    window.dbRef = dbRef
}

// init db when page loaded
document.addEventListener('DOMContentLoaded', async function () {
    console.log('dbRef', window.dbRef)
    if (!window.dbRef) {
        initDB()
    }
    const form = document.querySelector('.basic-grey')
    // fetch questions from firebase
    const questions = await getRecords()
    window.questions = questions
    const path = getCurrentPagePath()
    if (path.includes('reading')) {
        loadReadingData()
    } else if (path.includes('grammar')) {
        loadGrammarData()
    } else if (path.includes('vocabulary')) {
        loadVocabularyData()
    }
    addSumbitButtonListener()
});

get(child(window.dbRef, `users`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});

function getRecords() {
    return new Promise((resolve, reject) => {
        get(child(window.dbRef, `questions`)).then((snapshot) => {
            if (snapshot.exists()) {
                resolve(snapshot.val())
            } else {
                reject('No data available')
            }
        }).catch((error) => {
            console.error(error);
        });
    })
}

function setRecords(username, module, answer) {
    return new Promise((resolve, reject) => {
        set(ref(window.db, 'user-answers/' + username), {
            module: module,
            answer: answer
        }).then(() => {
            resolve()
        }).catch(() => {
            reject()
        })
    })
}

function getCurrentPagePath() {
    const url = document.location.toString();
    const arrUrl = url.split("//");

    const start = arrUrl[1].indexOf("/");
    let relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

    if (relUrl.indexOf("?") != -1) {
        relUrl = relUrl.split("?")[0];
    }
    return relUrl
}

function loadReadingData() {
    loadData(window.questions.module1)
    window.module = 1
}

function loadGrammarData() {
    loadData(window.questions.module2)
    window.module = 2
}

function loadVocabularyData() {
    loadData(window.questions.module3)
    window.module = 3
}


function loadData(data) {
    let questions = document.querySelector('.questions')
    const grammarQuestions = data
    console.log({ grammarQuestions })
    let innerHtml = ''
    window.feedback = {}
    Object.keys(grammarQuestions).forEach((item, index) => {
        const { question, answer, feedback } = grammarQuestions[item]
        const currentIndex = index + 1
        let options = []
        innerHtml += `<div class="title">Q${currentIndex}. ${question}</div>`
        if (answer?.type === 'checkbox') {
            options = answer.content.split(';')
            console.log({ options })
            innerHtml += `<div id="question-${currentIndex}">`
            options.forEach((option, index) => {
                let str = "A";
                innerHtml += `<label class="checkbox"><input name="radio${currentIndex}" type="radio" value=${option} />${String.fromCharCode(str.charCodeAt() + index)}.${option}</label>`
            })
            innerHtml += '</div>'
            if ([1, 2].includes(currentIndex)) {
                window.feedback['q' + currentIndex] = feedback
                innerHtml += `<div class="feedback feedback${currentIndex}"></div>`
            }
        } else if (answer?.type === 'text') {
            window.feedback['q' + currentIndex] = feedback
            innerHtml += `<textarea id="question-${currentIndex}" cols=60 rows=10 name=text></textarea>`
            if ([1, 2].includes(currentIndex)) {
                innerHtml += `<div class="feedback feedback${currentIndex}"></div>`
            }
        }

    })
    questions.innerHTML = innerHtml
    addEventListenerToQ12()
}

function addEventListenerToQ12() {
    const q1 = document.querySelector('#question-1')
    const q2 = document.querySelector('#question-2')
    const q3 = document.querySelector('#question-3')
    const q4 = document.querySelector('#question-4')
    const q5 = document.querySelector('#question-5')
    window.questionAnswer = { q1: '', q2: '', q3: '', q4: '', q5 }
    q1.addEventListener('change', function (event) {
        const { value, type } = event.target
        if (value) {
            const feedback = document.querySelector('.feedback1')
            if (feedback) feedback.innerHTML = `<div class="feedback">Feedback: ${window.feedback['q1']}</div>`
            window.questionAnswer['q1'] = value
        }
        console.log(window.questionAnswer['q1'])
    })

    q2.addEventListener('change', function (event) {
        console.log('---------')
        const { value, type } = event.target
        if (value) {
            const feedback = document.querySelector('.feedback2')
            feedback.innerHTML = `<div class="feedback">Feedback: ${window.feedback['q2']}</div>`
            window.questionAnswer['q2'] = value
        }
    })
    q3.addEventListener('change', function (event) {
        const { value, type } = event.target
        if (value)
            window.questionAnswer['q3'] = value
    })
    q4.addEventListener('change', function (event) {
        const { value, type } = event.target
        if (value)
            window.questionAnswer['q4'] = value
    })
    q5.addEventListener('change', function (event) {
        const { value, type } = event.target
        if (value)
            window.questionAnswer['q5'] = value
    })
}


function addSumbitButtonListener() {
    const sumbitBtn = document.querySelector('#submit')
    sumbitBtn.addEventListener('click', async function (event) {
        let filledAll = true
        console.log(window.questionAnswer)
        Object.keys(window.questionAnswer).some(item => {
            if (!window.questionAnswer[item]) {
                filledAll = false
                return true
            }
        })
        if (!filledAll) {
            alert('Please fill in all the questions')
            return
        } else {
            const name = prompt("What's your name")
            if (name) {
                try {
                    await setRecords(name, window.module, window.questionAnswer)
                } catch (error) {
                    console.log('error', error)
                }
                sumbitBtn.style = 'display:none'
                const questions = document.querySelector('.questions')
                questions.style = 'display: none'
                const teacher = document.querySelector('.teacher')
                const currentModule = window.questions['module' + window.module]
                Object.keys(currentModule).forEach((item, index) => {
                    teacher.innerHTML += `<div class="title">${'Q' + (index + 1) + '. ' + currentModule[item].question}</div><div><span style="font-weight: bold;">Student Answer: </span>${window.questionAnswer[item]}</div>`
                })
            }
        }
    })

}
