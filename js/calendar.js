document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');

    if (calendarGrid && currentMonthElement && prevMonthButton && nextMonthButton) {
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();

        // Sample events data
        const events = [
            { title: 'Summer Festival', date: new Date(2023, 5, 15), type: 'cultural' },
            { title: 'Language Workshop', date: new Date(2023, 5, 22), type: 'language' },
            { title: 'Cooking Class', date: new Date(2023, 5, 29), type: 'workshop' },
            { title: 'Children\'s Dance', date: new Date(2023, 6, 5), type: 'workshop' },
            { title: 'Community Meeting', date: new Date(2023, 5, 8), type: 'community' },
            { title: 'Folk Music Night', date: new Date(2023, 6, 12), type: 'cultural' },
            { title: 'Slovak History Talk', date: new Date(2023, 5, 18), type: 'language' }
        ];

        // Generate calendar
        function generateCalendar(month, year) {
            // Clear calendar grid
            calendarGrid.innerHTML = '';

            // Update current month display
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            currentMonthElement.textContent = `${monthNames[month]} ${year}`;

            // Get first day of month and number of days in month
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            // Add day headers
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            dayNames.forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.className = 'calendar-day-header';
                dayHeader.textContent = day;
                dayHeader.style.fontWeight = 'bold';
                dayHeader.style.textAlign = 'center';
                dayHeader.style.padding = '0.5rem';
                calendarGrid.appendChild(dayHeader);
            });

            // Add empty cells for days before first day of month
            for (let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day empty';
                calendarGrid.appendChild(emptyDay);
            }

            // Add days of month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;

                // Check if this is today
                const today = new Date();
                if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    dayElement.classList.add('today');
                }

                calendarGrid.appendChild(dayElement);
            }
        }

        // Initial calendar generation
        generateCalendar(currentMonth, currentYear);

        // Event listeners for month navigation
        prevMonthButton.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentMonth, currentYear);
        });

        nextMonthButton.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentMonth, currentYear);
        });
    }
});
