import { getDatabase, ref, set, update, child, get, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js'
const firebaseConfig = {
    "type": "service_account",
    "project_id": "student-questions-e6290",
    "private_key_id": "b6abbf4223e8e00d3fb30e68efac0289aeab43fb",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC2H+zozg8kqY8U\n4WtwejciKxlmaHw3KU8B+0y8C43ZNsZR3ODxyNQ61nHnq15jM37ld5jZV125IZwR\npq19QQYP9u/YYkmY+Seu5EtchbXCA5a58ZrnzxuaZri8IEr0XYwE6alYRMTy1JVq\nJHXPy8nQI3wm7z4G0K3iI8QFEi9VIBG/aLe4XSjkrwcpziSHVfPauot5uNu/aVDc\nGvJ80T1JPyXf5IRk3mJs10KLyx5VUL0ZaKrTDgJ+376YfckoNU9/QXUNvwl7QdZy\nqK326MMKjv7QEJ9fbDpt/JEDUTg41aQhDDy+uNL/ydcW5JfPodaRzyjDsQleYKnO\nc/evGj7vAgMBAAECggEAP9aY+FGiRTuaB7usKVTtlnB9CsR9Jei45PztPMzf/8+P\nXIqL3rSCj80zR/1trGAUjuKJFUXmeEorppRCI7FzKo1oLPTmz1QmcMtdDyVfPI59\netgRcEfMaSawgmDfZSCVP/OXhHU2g9e4N+hn01qfdvG5Rvx9RW5IRQg8YXqqVK+8\nH8IAY7i80MciM6dSQ317AB3KMvFrtm5jvvCFYxj5S5rUjgpxQ5SHPRMM7I6hD0ze\nMb4UN6KfxRwfhoV9GvYBbqnBe1KQ2dl2t21gUWh4Uj7vovvfa7FNgKCgwXgqAGqN\nW1IPjCid+Lk5WhQwwv7zG0UtmgZKXLitlrnU/yc9YQKBgQD489F1zz+Wq+K9zAtL\noMXgUlSdwYmVJqOwhZJgp3OQFQlUKI8VsUYw8yGcHKWNXE7v4rUR3HwdN7kUB62x\nR5a0keG3/Sh2NS4NfySYHKy6ANYkzp8B29Mskpg7wYQt2GZftqjglJ5eken8sYgd\nWMlGwvny1KHlyT9/5RGlD8Yp9QKBgQC7R8zs4ozfGT0erQt8G0yPexsPRuvY5Zj7\nQh1cWLSBmid2xXm5nHvx+zjQpuqTAG4D9+98Xu9sNmRDYyfeGhaCoDjScwLwCCKq\nw2rbscAvE1vYVb4UtxM5QKUWKJrxaFztP6VvLHbK5Eb6lmwXyDNLiY7+ZqhjEd0o\n2TWduNLC0wKBgExo8Wo6YScKvL5KaVEeGH3gZy5AX80Snf0pEiNuYe7gNgvJoxki\nXwvZJAC5XirEIUpJiA/iX4nMN5cpQCuAcIYdnG0PW6Lkca0c0AuMCYvRg+iqLm2w\nneE5YVY98CbuG4XXF4BOvUkDehDgIIn5XVXFtFfO4Z4Ypc/IbCEAdW8dAoGBAIj2\nnLcNhErQ0XMyyLht2pMATCzjCC7q0vPGSWS09uXlkED7cOc+uyKgQM/PkrQJV2wN\nkhaZ821nZfImfQygdZ/4fzXhqN9Ug83w9qBPIacL+FqBcm8B6MwxK8rFzXMJiRR1\nPI7OrN37DrHK+qh14JW4t1v0ReeWM/Dg0aZUecbDAoGBAMbz0dEy5xkVWYpdw534\n67xevFCDty8BQr2YRP9/xCUPK9OeEsOiJlRk3BbaNKOexYQBkOdus3JYq7lzfT3E\nsEX8YKRJziWE6sPgrmHFG28N+NKgh7/D0M/QD8UHu4Uk4B4uSy86kucIIUQzG/cg\nqqqikV4QWVHMfk4ZLgsYMYk0\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-ijy1o@student-questions-e6290.iam.gserviceaccount.com",
    "client_id": "102639923013186962838",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ijy1o%40student-questions-e6290.iam.gserviceaccount.com",
    "databaseURL": "https://student-questions-e6290-default-rtdb.firebaseio.com"
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

// create records
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
            innerHtml += `<div id="question-${currentIndex}">`
            options.forEach((option, index) => {
                let str = "A";
                innerHtml += `<label class="checkbox"><input name="radio${currentIndex}" type="radio" value=${option} />${String.fromCharCode(str.charCodeAt() + index)}. ${option}</label>`
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
        } else if (answer?.type === 'multi-checkbox') {
            innerHtml += `<div id="question-${currentIndex}">`
            options = answer.content.split(';')
            options.forEach((option, index) => {
                let str = "A";
                innerHtml += `<input type="checkbox" value="${option}"><label style="margin-right: 2rem">${String.fromCharCode(str.charCodeAt() + index)}. ${option}</label>`
            })
            innerHtml += '</div>'
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
        console.log(value, type)
        if (value && type === 'radio') {
            window.questionAnswer['q3'] = value
        } else if (value && type == 'checkbox') {
            // window.questionAnswer['q3'] += value
            if (window.questionAnswer['q3'].includes(value)) {
                window.questionAnswer['q3'].splice(window.questionAnswer['q3'].findIndex(item => item === value), 1)
            } else {
                if (Array.isArray(window.questionAnswer['q3'])) {
                    window.questionAnswer['q3'].push(value)
                } else {
                    window.questionAnswer['q3'] = [value]
                }
            }
        }

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
                    const correctAnswer = currentModule['q' + (index + 1)].answer.key
                    teacher.innerHTML += `<div class="title">${'Q' + (index + 1) + '. ' + currentModule[item].question}</div><div><span style="font-weight: bold;">Your Answer: </span>${window.questionAnswer[item]}
                    <br/>
                    ${correctAnswer ? `Correct Answer: ${correctAnswer}` : ''}
                    </div>`
                })
            }
        }
    })

}
