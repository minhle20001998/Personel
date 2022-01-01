const days = ["Chủ Nhật", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"]

export const formatReadableDate = (date) => {
    const d = new Date(+date);
    return `${d.getDay() !== 0 ? `Thứ ${days[d.getDay()]}` : days[d.getDay()]} ngày ${d.getDate()} tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`
}

