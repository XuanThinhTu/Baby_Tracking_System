import React from "react";

// Tên tháng
const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Kiểm tra năm nhuận
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Số ngày trong tháng
function getDaysInMonth(year, month) {
    // month: 0=Jan,1=Feb,...11=Dec
    switch (month) {
        case 1: // February
            return isLeapYear(year) ? 29 : 28;
        case 3: case 5: case 8: case 10:
            return 30;
        default:
            return 31;
    }
}

// Tính offset Monday=0, Tuesday=1,... Sunday=6
function getFirstDayOffset(year, month) {
    const day = new Date(year, month, 1).getDay(); // 0=Sunday,1=Mon,...
    // transform Sunday->6, Monday->0, ...
    return (day + 6) % 7;
}

export default function DatePicker({
    onSelectDay,
    availableDays = [], // ví dụ: [24, 28, 30, 31]
    selectedDay,
}) {
    // Giữ local state cho năm/tháng
    const [year, setYear] = React.useState(2025);
    const [month, setMonth] = React.useState(0); // 0=Jan

    // Tính số ngày trong tháng và offset
    const DAYS_IN_MONTH = getDaysInMonth(year, month);
    const FIRST_DAY_OFFSET = getFirstDayOffset(year, month);

    // Tạo mảng 42 ô (6 hàng x 7 cột)
    const cells = new Array(42).fill(null);
    for (let dayNumber = 1; dayNumber <= DAYS_IN_MONTH; dayNumber++) {
        const index = FIRST_DAY_OFFSET + (dayNumber - 1);
        cells[index] = dayNumber;
    }

    // Cắt thành 6 hàng
    const rows = [];
    for (let r = 0; r < 6; r++) {
        rows.push(cells.slice(r * 7, r * 7 + 7));
    }

    // Xử lý Prev/Next tháng
    const handlePrevMonth = () => {
        let newMonth = month - 1;
        let newYear = year;
        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        }
        setMonth(newMonth);
        setYear(newYear);
    };

    const handleNextMonth = () => {
        let newMonth = month + 1;
        let newYear = year;
        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }
        setMonth(newMonth);
        setYear(newYear);
    };

    // Hàm kiểm tra ngày đang chọn (để highlight)
    const isSelectedDay = (dayNumber) => {
        return (
            selectedDay &&
            selectedDay.year === year &&
            selectedDay.month === month &&
            selectedDay.day === dayNumber
        );
    };

    return (
        <div className="w-full flex flex-col bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
            {/* Header tháng/năm */}
            <div className="p-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Chọn năm */}
                    <select
                        className="border border-gray-300 rounded px-2 py-1 text-gray-700"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                    >
                        {Array.from({ length: 10 }, (_, i) => 2020 + i).map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>

                    {/* Chọn tháng */}
                    <select
                        className="border border-gray-300 rounded px-2 py-1 text-gray-700"
                        value={month}
                        onChange={(e) => setMonth(Number(e.target.value))}
                    >
                        {MONTH_NAMES.map((mName, i) => (
                            <option key={mName} value={i}>
                                {mName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        className="text-gray-600 hover:bg-gray-100 rounded-full p-1"
                        aria-label="Prev Month"
                        onClick={handlePrevMonth}
                    >
                        &lt;
                    </button>
                    <button
                        className="text-gray-600 hover:bg-gray-100 rounded-full p-1"
                        aria-label="Next Month"
                        onClick={handleNextMonth}
                    >
                        &gt;
                    </button>
                </div>
            </div>

            {/* Dòng tên thứ (Mon..Sun) */}
            <div className="flex py-2 px-2 w-full justify-between">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((dow) => (
                    <div
                        key={dow}
                        className="flex-1 text-center text-base text-gray-500 font-medium"
                    >
                        {dow}
                    </div>
                ))}
            </div>

            {/* Khối hiển thị ngày */}
            <div className="flex flex-col px-2 pb-2">
                {rows.map((rowCells, rowIndex) => (
                    <div key={rowIndex} className="flex w-full justify-between">
                        {rowCells.map((dayNumber, colIndex) => {
                            if (!dayNumber) {
                                return <div key={colIndex} className="w-14 h-14 m-1" />;
                            }

                            // Kiểm tra có phải ngày đang chọn hay không
                            const selected = isSelectedDay(dayNumber);
                            // Kiểm tra có nằm trong availableDays hay không
                            const isAvailable = availableDays.includes(dayNumber);

                            let buttonClass =
                                "m-1 w-14 h-14 flex items-center justify-center rounded-full text-base font-medium transition ";

                            if (selected) {
                                // Ngày đang chọn => nền xanh, chữ trắng
                                buttonClass += "bg-blue-500 text-white ";
                            } else if (isAvailable) {
                                // Có lịch => border xanh, chữ xanh
                                buttonClass +=
                                    "border border-blue-500 text-blue-500 hover:bg-blue-50 cursor-pointer ";
                            } else {
                                // Không có lịch => border xám, chữ xám
                                // Vẫn cho phép click để hiển thị "Không có lịch trống"
                                buttonClass +=
                                    "border border-gray-300 text-gray-400 hover:bg-gray-50 cursor-pointer ";
                            }

                            return (
                                <button
                                    key={colIndex}
                                    className={buttonClass}
                                    onClick={() => {
                                        if (onSelectDay) {
                                            onSelectDay({ year, month, day: dayNumber });
                                        }
                                    }}
                                >
                                    {dayNumber}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
