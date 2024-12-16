const eventNameInput = document.getElementById('event-name');
const eventDateInput = document.getElementById('event-date');
const addEventButton = document.getElementById('add-event');
const eventList = document.querySelector('.event-list');

let events = [];

// イベント追加関数
function addEvent() {
    const name = eventNameInput.value.trim();
    const date = new Date(eventDateInput.value);

    if (!name || !eventDateInput.value) {
        alert('イベント名と日時を入力してください。');
        return;
    }

    if (date <= new Date()) {
        alert('未来の日時を設定してください。');
        return;
    }

    events.push({ name, date });
    renderEvents();

    eventNameInput.value = '';
    eventDateInput.value = '';
}

// イベントのレンダリング
function renderEvents() {
    eventList.innerHTML = ''; // リストをクリア
    const now = new Date();

    events.sort((a, b) => a.date - b.date);

    events.forEach((event, index) => {
        const remainingTime = event.date - now;
        const expired = remainingTime <= 0;
        const timeText = expired ? '終了しました' : formatTime(remainingTime);

        const li = document.createElement('li');
        li.className = expired ? 'expired' : '';
        li.innerHTML = `
            <span>${event.name}</span>
            <span>${timeText}</span>
        `;

        // 削除ボタンを追加
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        deleteButton.addEventListener('click', () => {
            deleteEvent(index);
        });
        li.appendChild(deleteButton);

        eventList.appendChild(li);
    });
}

// 残り時間をフォーマット
function formatTime(ms) {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60)) % 60;
    const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return `${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`;
}

// イベントを削除
function deleteEvent(index) {
    events.splice(index, 1);
    renderEvents();
}

// 1秒ごとにカウントダウンを更新
setInterval(renderEvents, 1000);

// イベントリスナー
addEventButton.addEventListener('click', addEvent);
