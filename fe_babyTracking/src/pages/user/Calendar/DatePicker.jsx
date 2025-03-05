import React, { useState } from "react";

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
// new Date(year, month, 1).getDay() => 0=Sunday,1=Mon,... => ta cần Monday=0
function getFirstDayOffset(year, month) {
    const day = new Date(year, month, 1).getDay(); // 0=Sunday,1=Mon,...
    // => transform Sunday->6, Monday->0, Tuesday->1...
    return (day + 6) % 7;
}

export default function DatePicker({
    onSelectDay,
    availableDays = [], // array dayNumber, tuỳ
}) {
    // State month/year
    const [year, setYear] = useState(2025);
    const [month, setMonth] = useState(0); // 0=Jan,1=Feb,...

    // Số ngày trong tháng
    const DAYS_IN_MONTH = getDaysInMonth(year, month);
    // Offset Monday=0 => cột offset
    const FIRST_DAY_OFFSET = getFirstDayOffset(year, month);

    // Tạo mảng 42 ô
    const cells = new Array(42).fill(null);
    for (let dayNumber = 1; dayNumber <= DAYS_IN_MONTH; dayNumber++) {
        const index = FIRST_DAY_OFFSET + (dayNumber - 1);
        cells[index] = dayNumber;
    }

    // Cắt 42 ô thành 6 hàng
    const rows = [];
    for (let row = 0; row < 5; row++) {
        rows.push(cells.slice(row * 7, row * 7 + 7));
    }

    // Xử lý Prev/Next
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

    return (
        <div className="w-full h-full flex flex-col bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
            {/* Header tháng/năm */}
            <div className="p-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Chọn năm */}
                    <select
                        className="border border-gray-300 rounded px-2 py-1 text-gray-700"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                    >
                        {/* Tuỳ ý range year */}
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
                        className="size-8 flex justify-center items-center text-gray-600 hover:bg-gray-100 rounded-full p-1"
                        aria-label="Prev Month"
                        onClick={handlePrevMonth}
                    >
                        &lt;
                    </button>
                    <button
                        className="size-8 flex justify-center items-center text-gray-600 hover:bg-gray-100 rounded-full p-1"
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

            {/* Các hàng ngày => full */}
            <div className="flex flex-col flex-grow px-2">
                {rows.map((rowCells, rowIndex) => (
                    <div key={rowIndex} className="flex w-full justify-between">
                        {rowCells.map((dayNumber, colIndex) => {
                            if (!dayNumber) {
                                return <div key={colIndex} className="w-14 h-14 m-1" />;
                            }

                            // Kiểm tra dayNumber có trong availableDays
                            const isAvailable = availableDays.includes(dayNumber);

                            let buttonClass =
                                "m-1 w-14 h-14 flex items-center justify-center rounded-full text-xl ";

                            if (isAvailable) {
                                buttonClass +=
                                    "border border-blue-500 text-blue-500 hover:bg-blue-50 cursor-pointer ";
                            } else {
                                buttonClass += "text-gray-400 cursor-not-allowed ";
                            }

                            return (
                                <button
                                    key={colIndex}
                                    className={buttonClass}
                                    disabled={!isAvailable}
                                    onClick={() => {
                                        if (isAvailable && onSelectDay) {
                                            // Trả về { year, month, day }
                                            onSelectDay({
                                                year,
                                                month,
                                                day: dayNumber,
                                            });
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

