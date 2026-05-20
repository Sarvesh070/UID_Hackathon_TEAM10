// Data initialization
const events = [
    { id: 'E01', name: 'Football', cat: 'Outdoor', time: '2026-05-25 09:00', venue: 'Main Ground', fee: 500, status: 'Open' },
    { id: 'E02', name: 'Chess', cat: 'Indoor', time: '2026-05-25 10:00', venue: 'Hall A', fee: 100, status: 'Open' },
    { id: 'E03', name: '100m Dash', cat: 'Athletics', time: '2026-05-26 08:00', venue: 'Track', fee: 50, status: 'Open' },
    { id: 'E04', name: 'Badminton', cat: 'Indoor', time: '2026-05-26 11:00', venue: 'Sports Complex', fee: 200, status: 'Closed' },
    { id: 'E05', name: 'Cricket', cat: 'Outdoor', time: '2026-05-27 09:00', venue: 'Main Ground', fee: 1000, status: 'Open' }
];

let registrations = [];
let feedbacks = [];

// Date & Time Functionality
if (document.getElementById('current-date-time')) {
    setInterval(() => {
        const now = new Date();
        document.getElementById('current-date-time').innerText = now.toLocaleString();
    }, 1000);
}

// Populate Events
const eventsGrid = document.getElementById('events-grid');
const eventSelect = document.getElementById('eventSelect');

if (eventsGrid) {
    events.forEach(ev => {
        eventsGrid.innerHTML += `
            <div class="event-card">
                <h4>${ev.name} (${ev.id})</h4>
                <p>Category: ${ev.cat}</p>
                <p>Venue: ${ev.venue}</p>
                <p>Status: <b style="color:${ev.status === 'Open' ? 'green' : 'red'}">${ev.status}</b></p>
                <p>Fee: ₹${ev.fee}</p>
            </div>
        `;
        const opt = document.createElement('option');
        opt.value = ev.name;
        opt.innerText = ev.name;
        eventSelect.appendChild(opt);
    });
}

// Form logic
function toggleTeamFields() {
    const type = document.getElementById('participationType').value;
    document.getElementById('teamFields').style.display = (type === 'Team') ? 'block' : 'none';
}

const regForm = document.getElementById('registrationForm');
if (regForm) {
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = document.getElementById('msg');
        const name = document.getElementById('studentName').value;
        const regNo = document.getElementById('regNo').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const eventName = document.getElementById('eventSelect').value;
        const type = document.getElementById('participationType').value;
        
        // Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const eventData = events.find(ev => ev.name === eventName);

        if (name.length < 3) return showError("Invalid Name");
        if (!emailRegex.test(email)) return showError("Invalid Email");
        if (mobile.length !== 10 || isNaN(mobile)) return showError("Mobile must be 10 digits");
        if (!eventData) return showError("Select an event");
        if (eventData.status === 'Closed') return showError("This event is closed!");
        
        // Duplicate Check
        const isDuplicate = registrations.some(r => r.regNo === regNo && r.event === eventName);
        if (isDuplicate) return showError("You already registered for this event!");

        if (type === 'Team') {
            const tSize = document.getElementById('teamSize').value;
            if (tSize < 2 || tSize > 6) return showError("Team size must be 2-6");
        }

        // Success
        const entry = { name, regNo, event: eventName, date: new Date().toLocaleDateString() };
        const isInvalidRegNo = registrations.some(r => r.regNo === regNo && r.event === eventName);
        if (!emailRegex.test(email)) return showError("Invalid Email");
        if (isInvalidRegNo) return showError("Invalid Registration Number");
        registrations.push(entry);
        
        msg.innerHTML = `<span class="success-msg">Success! Registration confirmed.</span>`;
        document.getElementById('participant-count').innerText = registrations.length;
        
        document.getElementById('displayArea').style.display = 'block';
        document.getElementById('receipt').innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Event:</strong> ${eventName}</p>
            <p><strong>Reg No:</strong> ${regNo}</p>
        `;
        regForm.reset();
        toggleTeamFields();
    });
}

function showError(text) {
    const msg = document.getElementById('msg');
    msg.innerHTML = `<span class="error-msg">${text}</span>`;
    return false;
}

// Feedback Logic
const fForm = document.getElementById('feedbackForm');
if (fForm) {
    fForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rating = parseInt(document.getElementById('rating').value);
        const comm = document.getElementById('comments').value;

        if (comm.length < 20) {
            alert("Comment must be at least 20 characters.");
            return;
        }

        feedbacks.push(rating);
        const avg = feedbacks.reduce((a, b) => a + b, 0) / feedbacks.length;

        document.getElementById('feedbackSummary').style.display = 'block';
        document.getElementById('avgRating').innerText = `Average Rating: ${avg.toFixed(1)} / 5`;
        
        const list = document.getElementById('feedbackList');
        list.innerHTML += `<p><strong>${document.getElementById('fName').value}:</strong> ${comm} (Rating: ${rating})</p>`;
        fForm.reset();
    });
}