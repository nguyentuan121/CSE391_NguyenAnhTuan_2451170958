// student_data.js

const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// Biến đếm xếp loại
let gioi = 0;
let kha = 0;
let trungBinh = 0;
let yeu = 0;

// Tổng điểm từng môn
let totalMath = 0;
let totalPhysics = 0;
let totalCS = 0;

// Bonus: tổng TB theo giới tính
let maleTotal = 0;
let femaleTotal = 0;
let maleCount = 0;
let femaleCount = 0;

// Tìm max/min
let highestStudent = null;
let lowestStudent = null;

console.log("------------------------------------------------");
console.log("| STT | Tên     | TB   | Xếp loại           |");
console.log("------------------------------------------------");

// Duyệt mảng sinh viên
for (let i = 0; i < students.length; i++) {

    let s = students[i];

    // Tính điểm trung bình
    let avg = s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3;

    // Làm tròn 1 số lẻ
    avg = avg.toFixed(1);

    // Xếp loại
    let rank = "";

    if (avg >= 8.0) {
        rank = "Giỏi";
        gioi++;
    }
    else if (avg >= 6.5) {
        rank = "Khá";
        kha++;
    }
    else if (avg >= 5.0) {
        rank = "Trung bình";
        trungBinh++;
    }
    else {
        rank = "Yếu";
        yeu++;
    }

    // In bảng
    console.log(
        `| ${i + 1}   | ${s.name.padEnd(7)} | ${avg} | ${rank.padEnd(18)} |`
    );

    // Cộng tổng môn học
    totalMath += s.math;
    totalPhysics += s.physics;
    totalCS += s.cs;

    // Bonus: theo giới tính
    if (s.gender === "M") {
        maleTotal += Number(avg);
        maleCount++;
    } else {
        femaleTotal += Number(avg);
        femaleCount++;
    }

    // Tìm sinh viên cao nhất
    if (highestStudent === null || avg > highestStudent.avg) {
        highestStudent = {
            name: s.name,
            avg: Number(avg)
        };
    }

    // Tìm sinh viên thấp nhất
    if (lowestStudent === null || avg < lowestStudent.avg) {
        lowestStudent = {
            name: s.name,
            avg: Number(avg)
        };
    }
}

console.log("------------------------------------------------");

// Đếm xếp loại
console.log("\nSỐ LƯỢNG XẾP LOẠI:");
console.log("Giỏi:", gioi);
console.log("Khá:", kha);
console.log("Trung bình:", trungBinh);
console.log("Yếu:", yeu);

// SV cao nhất và thấp nhất
console.log("\nSINH VIÊN CAO ĐIỂM NHẤT:");
console.log(highestStudent.name, "-", highestStudent.avg);

console.log("\nSINH VIÊN THẤP ĐIỂM NHẤT:");
console.log(lowestStudent.name, "-", lowestStudent.avg);

// Điểm TB toàn lớp từng môn
console.log("\nĐIỂM TRUNG BÌNH TOÀN LỚP:");

console.log(
    "Math:",
    (totalMath / students.length).toFixed(2)
);

console.log(
    "Physics:",
    (totalPhysics / students.length).toFixed(2)
);

console.log(
    "CS:",
    (totalCS / students.length).toFixed(2)
);

// Bonus: TB theo giới tính
console.log("\nĐIỂM TB THEO GIỚI TÍNH:");

console.log(
    "Nam:",
    (maleTotal / maleCount).toFixed(2)
);

console.log(
    "Nữ:",
    (femaleTotal / femaleCount).toFixed(2)
);