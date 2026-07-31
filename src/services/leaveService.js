// src/services/leaveService.js
import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";

const leavesRef = collection(db, "leaves");

export async function getLeavesForEmployee(employeeId) {
    const q = query(
        leavesRef,
        where("employeeId", "==", employeeId),
        orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Admin/HR: all leave requests across the company.
export async function getAllLeaves() {
    const q = query(leavesRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function applyLeave({ employeeId, employeeName, type, startDate, endDate, reason, days }) {
    const payload = {
        employeeId,
        employeeName,
        type,
        startDate,
        endDate,
        days,
        reason,
        status: "Pending",
        approvedBy: null,
        createdAt: serverTimestamp(),
    };

    const ref = await addDoc(leavesRef, payload);
    return { id: ref.id, ...payload };
}

export async function cancelLeave(leaveId) {
    await deleteDoc(doc(db, "leaves", leaveId));
    return leaveId;
}

export async function setLeaveStatus(leaveId, status, approvedBy) {
    const payload = { status, approvedBy: approvedBy || null };
    await updateDoc(doc(db, "leaves", leaveId), payload);
    return payload;
}
