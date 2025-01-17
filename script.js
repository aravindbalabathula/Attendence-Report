

document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const ROLL_NUMBERS = [633,1,2,3,4,5,6,7,8,9,10,11,13,14,15,16,17,19,20,21,22,23,24,25,27,28,29,30,31,32,33,34,35,36,38,40,41,43,44,45,46,48,49,50,51,52,53,54,55,56,57,58,59,61,62,63,64,65,66,67,68,69,70,72,73,75,76,77,78,79,80,81,82,83,85,86,87,88,89,92,93,100,110,111];
    const TOTAL_STUDENTS = 84;

    // State
    let students = ROLL_NUMBERS.map(rollNo => ({
        rollNo,
        status: 'default' // 'default' | 'present' | 'absent'
    }));

    // DOM Elements
    const adminBtn = document.getElementById('adminBtn');
    const generateReportBtn = document.getElementById('generateReportBtn');
    const adminPanel = document.getElementById('adminPanel');
    const reportPanel = document.getElementById('reportPanel');
    const attendanceGrid = document.getElementById('attendanceGrid');
    const roomSelect = document.getElementById('roomSelect');

    // Initialize room numbers
    for (let i = 10; i <= 15; i++) {
        const option = document.createElement('option');
        option.value = `2-${i.toString().padStart(3, '0')}`;
        option.textContent = `2-${i.toString().padStart(3, '0')}`;
        roomSelect.appendChild(option);
    }

    // Toggle Panels
    adminBtn.addEventListener('click', () => {
        adminPanel.classList.toggle('hidden');
        reportPanel.classList.add('hidden');
    });

    generateReportBtn.addEventListener('click', () => {
        updateReport();
        reportPanel.classList.remove('hidden');
        adminPanel.classList.add('hidden');
    });

    // Create Student Boxes
    function createAttendanceGrid() {
        attendanceGrid.innerHTML = '';
        students.forEach((student, index) => {
            const box = document.createElement('button');
            box.className = `student-box ${student.status}`;
            box.textContent = student.rollNo;
            box.addEventListener('click', () => toggleAttendance(index));
            attendanceGrid.appendChild(box);
        });
    }

    // Toggle Attendance Status
    function toggleAttendance(index) {
        const statusMap = {
            'default': 'present',
            'present': 'absent',
            'absent': 'default'
        };
        students[index].status = statusMap[students[index].status];
        createAttendanceGrid();
    }

    // Update Report
    function updateReport() {
        const currentDate = new Date().toLocaleDateString('en-GB');
        const presentCount = students.filter(s => s.status === 'present').length;
        const absentees = students
            .filter(s => s.status === 'absent')
            .map(s => s.rollNo)
            .sort((a, b) => a - b)
            .join(', ');

        document.getElementById('currentDate').textContent = currentDate;
        document.getElementById('reportClass').textContent = document.getElementById('classSelect').value;
        document.getElementById('reportRoom').textContent = document.getElementById('roomSelect').value;
        document.getElementById('reportSession').textContent = document.getElementById('sessionSelect').value;
        document.getElementById('reportTotal').textContent = TOTAL_STUDENTS;
        document.getElementById('reportPresent').textContent = `${presentCount}/${TOTAL_STUDENTS}`;
        document.getElementById('reportAbsentees').textContent = absentees || 'None';
    }

    // Initialize
    createAttendanceGrid();
});
