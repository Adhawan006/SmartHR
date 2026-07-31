// src/services/attendanceService.js
import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";

const attendanceRef = collection(db, "attendance");

function todayStr() {
    return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

// Returns today's attendance doc for an employee, or null.
export async function getTodayAttendance(employeeId) {
    const q = query(
        attendanceRef,
        where("employeeId", "==", employeeId),
        where("date", "==", todayStr())
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() };
}

export async function getAttendanceForEmployee(employeeId) {
    const q = query(
        attendanceRef,
        where("employeeId", "==", employeeId),
        orderBy("date", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Admin/HR: view all attendance, optionally filtered client-side by the caller.
export async function getAllAttendance() {
    const q = query(attendanceRef, orderBy("date", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function checkIn(employeeId, employeeName) {
    const existing = await getTodayAttendance(employeeId);
    if (existing) return existing;

    const payload = {
        employeeId,
        employeeName,
        date: todayStr(),
        checkIn: new Date().toISOString(),
        checkOut: null,
        status: "Present",
        createdAt: serverTimestamp(),
    };

    const ref = await addDoc(attendanceRef, payload);
    return { id: ref.id, ...payload };
}

export async function checkOut(attendanceDocId) {
    const payload = { checkOut: new Date().toISOString() };
    await updateDoc(doc(db, "attendance", attendanceDocId), payload);
    return payload;
}

export async function markAbsentOrLeave(employeeId, employeeName, status) {
    const payload = {
        employeeId,
        employeeName,
        date: todayStr(),
        checkIn: null,
        checkOut: null,
        status,
        createdAt: serverTimestamp(),
    };
    const ref = await addDoc(attendanceRef, payload);
    return { id: ref.id, ...payload };
}
