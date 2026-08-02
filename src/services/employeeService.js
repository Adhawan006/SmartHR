// src/services/employeeService.js
// Firestore-backed replacement for the old in-memory mock service.
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";

const employeesRef = collection(db, "employees");

export async function getEmployees() {
    const snap = await getDocs(employeesRef);

    console.log("Documents found:", snap.size);

    snap.forEach((doc) => {
        console.log(doc.id, doc.data());
    });

    return snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
    }));
}
export async function getEmployeeById(id) {
    const snap = await getDoc(doc(db, "employees", id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
}

export async function addEmployee(employeeData) {
    const payload = {
        status: "Active",
        ...employeeData,
        createdAt: serverTimestamp(),
    };
    const ref = await addDoc(employeesRef, payload);
    return { id: ref.id, ...payload };
}

export async function updateEmployee(id, employeeData) {
    await updateDoc(doc(db, "employees", id), employeeData);
    return { id, ...employeeData };
}

export async function deleteEmployee(id) {
    await deleteDoc(doc(db, "employees", id));
    return id;
}

// Employees don't get deleted from an audit standpoint as often as they get
// deactivated — kept as a convenience wrapper around updateEmployee.
export async function deactivateEmployee(id) {
    return updateEmployee(id, { status: "Inactive" });
}
