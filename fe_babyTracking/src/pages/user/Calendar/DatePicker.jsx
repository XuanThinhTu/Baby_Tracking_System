import React from "react";

export default function DatePicker({ onSelectDay, availableDays = [24, 28, 30, 31] }) {
    // Tháng 1/2025: 31 ngày, offset=2 (1/1/2025 là Wed)
    const DAYS_IN_MONTH = 31;
    const FIRST_DAY_OFFSET = 2;
    const cells = new Array(42).fill(null);

    for (let dayNumber = 1; dayNumber <= DAYS_IN_MONTH; dayNumber++) {
        const index = FIRST_DAY_OFFSET + (dayNumber - 1);
        cells[index] = dayNumber;
    }

    // Tạo 6 hàng × 7 cột
    const rows = [];
    for (let row = 0; row < 6; row++) {
        rows.push(cells.slice(row * 7, row * 7 + 7));
    }

    return (
        // w-full h-full => full cột
        <div className="w-full h-full flex flex-col bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
            {/* Header tháng/năm */}
            <div className="p-3 border-b flex items-center justify-between">
                <div className="text-2xl font-semibold text-gray-800">January 2025</div>
                <div className="flex items-center gap-2">
                    <button
                        className="size-8 flex justify-center items-center text-gray-600 hover:bg-gray-100 rounded-full p-1"
                        aria-label="Prev Month"
                        disabled
                    >
                        &lt;
                    </button>
                    <button
                        className="size-8 flex justify-center items-center text-gray-600 hover:bg-gray-100 rounded-full p-1"
                        aria-label="Next Month"
                        disabled
                    >
                        &gt;
                    </button>
                </div>
            </div>

            {/* Hàng hiển thị Thứ (Mon..Sun) => full chiều ngang */}
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

            {/* Các hàng ngày => full width */}
            <div className="flex flex-col flex-grow pb-2 px-2">
                {rows.map((rowCells, rowIndex) => (
                    <div key={rowIndex} className="flex w-full justify-between">
                        {rowCells.map((dayNumber, colIndex) => {
                            if (!dayNumber) {
                                return <div key={colIndex} className="w-14 h-14 m-1" />;
                            }

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
                                            onSelectDay(dayNumber);
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
