// Main application class
class RoomRentSystem {
    projectName = "Room Rental Management System";
    constructor() {
        this.users = [];
        this.owners = [];
        this.rooms = [];
        this.workers = [];
        this.currentUser = null;
        this.init();
    }

    init() {
        // Load any saved data from localStorage
        this.loadData();
        
        // Check if we have users, if not show registration
        if (this.users.length === 0) {
            this.showRegistration();
        } else {
            this.showLogin();
        }
    }

    loadData() {
        // Load data from localStorage
        const users = localStorage.getItem('rms_users');
        const owners = localStorage.getItem('rms_owners');
        const rooms = localStorage.getItem('rms_rooms');
        const workers = localStorage.getItem('rms_workers');

        if (users) this.users = JSON.parse(users);
        if (owners) this.owners = JSON.parse(owners);
        if (rooms) this.rooms = JSON.parse(rooms);
        if (workers) this.workers = JSON.parse(workers);
    }

    saveData() {
        // Save data to localStorage
        localStorage.setItem('rms_users', JSON.stringify(this.users));
        localStorage.setItem('rms_owners', JSON.stringify(this.owners));
        localStorage.setItem('rms_rooms', JSON.stringify(this.rooms));
        localStorage.setItem('rms_workers', JSON.stringify(this.workers));
    }

    showRegistration() {
        document.getElementById('content').innerHTML = `
            <div class="max-w-md mx-auto">
                <div class="mb-6 flex justify-between items-center">
                    <h2 class="text-2xl font-bold">User Registration</h2>
                    <button onclick="app.showDashboard()" 
                        class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                        Back to Dashboard
                    </button>
                </div>
                <form id="registrationForm" class="space-y-4">
                    <div>
                        <label class="block text-gray-700">Full Name</label>
                        <input type="text" id="regName" required 
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Email</label>
                        <input type="email" id="regEmail" required 
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Password</label>
                        <input type="password" id="regPassword" required 
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Contact Number</label>
                        <input type="tel" id="regContact" required 
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">User Role</label>
                        <select id="regRole" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="staff">Staff</option>
                            <option value="manager">Manager</option>
                            ${this.users.length === 0 ? '<option value="admin" selected>Admin</option>' : ''}
                        </select>
                    </div>
                    <button type="submit" 
                        class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
                        Register
                    </button>
                </form>
            </div>
        `;

        document.getElementById('registrationForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.registerUser(
                document.getElementById('regName').value,
                document.getElementById('regEmail').value,
                document.getElementById('regPassword').value,
                document.getElementById('regContact').value,
                document.getElementById('regRole').value
            );
        });
    }

    registerUser(name, email, password, contact, role) {
        // Validate email is unique
        if (this.users.some(u => u.email === email)) {
            alert('Email already registered');
            return;
        }

        const user = {
            id: Date.now(),
            name,
            email,
            password,
            contact,
            role,
            createdAt: new Date().toISOString(),
            isActive: true
        };
        this.users.push(user);
        this.saveData();
        this.currentUser = user;
        this.showDashboard();
    }

    showLogin() {
        document.getElementById('content').innerHTML = `
            <div class="max-w-md mx-auto">
                <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
                <form id="loginForm" class="space-y-4">
                    <div>
                        <label class="block text-gray-700">Email</label>
                        <input type="email" id="loginEmail" required 
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Password</label>
                        <input type="password" id="loginPassword" required 
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <button type="submit" 
                        class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
                        Login
                    </button>
                </form>
            </div>
        `;

        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.loginUser(
                document.getElementById('loginEmail').value,
                document.getElementById('loginPassword').value
            );
        });
    }

    loginUser(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            this.currentUser = user;
            this.showDashboard();
        } else {
            alert('Invalid credentials');
        }
    }

    showDashboard() {
        document.getElementById('content').innerHTML = `
            <div class="mb-6 flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold">Dashboard</h2>
                    <p class="text-gray-500">Room Rental Management System</p>
                    <p class="text-gray-600">Welcome, ${this.currentUser.name} (${this.currentUser.role})</p>
                </div>
                ${this.currentUser.role === 'admin' ? `
                <button onclick="app.showUserManagement()" 
                    class="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700">
                    Manage Users
                </button>
                ` : ''}
                <button onclick="app.showProfile()" 
                    class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                    My Profile
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <!-- Data Management -->
                <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
                    <h3 class="text-lg font-semibold mb-4 flex items-center">
                        <i class="fas fa-database mr-2 text-indigo-600"></i> Data Management
                    </h3>
                    <div class="space-y-3">
                        <button onclick="app.showOwners()" class="w-full flex items-center p-3 hover:bg-indigo-50 rounded-lg transition">
                            <i class="fas fa-user-tie mr-3 text-indigo-600 w-5 text-center"></i>
                            <span>Room Owners</span>
                        </button>
                        <button onclick="app.showRooms()" class="w-full flex items-center p-3 hover:bg-indigo-50 rounded-lg transition">
                            <i class="fas fa-door-open mr-3 text-indigo-600 w-5 text-center"></i>
                            <span>Rooms</span>
                        </button>
                        <button onclick="app.showWorkers()" class="w-full flex items-center p-3 hover:bg-indigo-50 rounded-lg transition">
                            <i class="fas fa-users mr-3 text-indigo-600 w-5 text-center"></i>
                            <span>Workers/Staff</span>
                        </button>
                        <button onclick="app.showProjectSites()" class="w-full flex items-center p-3 hover:bg-indigo-50 rounded-lg transition">
                            <i class="fas fa-building mr-3 text-indigo-600 w-5 text-center"></i>
                            <span>Project Sites</span>
                        </button>
                    </div>
                </div>

                <!-- Financial Center -->
                <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-500">
                    <h3 class="text-lg font-semibold mb-4 flex items-center">
                        <i class="fas fa-wallet mr-2 text-emerald-600"></i> Financial Center
                    </h3>
                    <div class="space-y-3">
                        <button onclick="app.showPaymentManagement()" class="w-full flex items-center p-3 hover:bg-emerald-50 rounded-lg transition">
                            <i class="fas fa-rupee-sign mr-3 text-emerald-600 w-5 text-center"></i>
                            <span>Payments</span>
                        </button>
                        <button onclick="app.showExpiringSoon()" class="w-full flex items-center p-3 hover:bg-emerald-50 rounded-lg transition">
                            <i class="fas fa-clock mr-3 text-emerald-600 w-5 text-center"></i>
                            <span>Expiring Soon</span>
                        </button>
                        <button onclick="app.sendExpirationReminders()" class="w-full flex items-center p-3 hover:bg-emerald-50 rounded-lg transition">
                            <i class="fas fa-bell mr-3 text-emerald-600 w-5 text-center"></i>
                            <span>Send Reminders</span>
                        </button>
                        <button onclick="app.showReports()" class="w-full flex items-center p-3 hover:bg-emerald-50 rounded-lg transition">
                            <i class="fas fa-file-invoice-dollar mr-3 text-emerald-600 w-5 text-center"></i>
                            <span>Financial Reports</span>
                        </button>
                    </div>
                </div>

                <!-- System Tools -->
                <div class="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500">
                    <h3 class="text-lg font-semibold mb-4 flex items-center">
                        <i class="fas fa-tools mr-2 text-amber-600"></i> System Tools
                    </h3>
                    <div class="space-y-3">
                        ${this.currentUser.role === 'admin' ? `
                        <button onclick="app.showUserManagement()" class="w-full flex items-center p-3 hover:bg-amber-50 rounded-lg transition">
                            <i class="fas fa-users-cog mr-3 text-amber-600 w-5 text-center"></i>
                            <span>User Management</span>
                        </button>
                        ` : ''}
                        <button onclick="app.showProfile()" class="w-full flex items-center p-3 hover:bg-amber-50 rounded-lg transition">
                            <i class="fas fa-user mr-3 text-amber-600 w-5 text-center"></i>
                            <span>My Profile</span>
                        </button>
                        <button onclick="app.showReports()" class="w-full flex items-center p-3 hover:bg-amber-50 rounded-lg transition">
                            <i class="fas fa-chart-bar mr-3 text-amber-600 w-5 text-center"></i>
                            <span>Analytics</span>
                        </button>
                        <div class="grid grid-cols-2 gap-3">
                            <button onclick="app.exportToPDF('summary')" class="flex items-center p-3 hover:bg-amber-50 rounded-lg transition">
                                <i class="fas fa-file-pdf mr-2 text-amber-600"></i>
                                <span>PDF</span>
                            </button>
                            <button onclick="app.exportToExcel('summary')" class="flex items-center p-3 hover:bg-amber-50 rounded-lg transition">
                                <i class="fas fa-file-excel mr-2 text-amber-600"></i>
                                <span>Excel</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Additional methods for owners, rooms, workers will be added here
    showOwners() {
        document.getElementById('content').innerHTML = `
            <div class="mb-6 flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold">Room Owners</h2>
                    <p class="text-gray-500">${this.projectName}</p>
                </div>
                <div class="flex space-x-2">
                    <button onclick="app.showDashboard()" 
                        class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                        Back to Dashboard
                    </button>
                    <button onclick="app.addOwner()" 
                        class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                        Add Owner
                    </button>
                </div>
            </div>
            
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="py-3 px-4 text-left">Name</th>
                            <th class="py-3 px-4 text-left">Contact</th>
                            <th class="py-3 px-4 text-left">Bank Details</th>
                            <th class="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${this.owners.map(owner => `
                            <tr>
                                <td class="py-3 px-4">${owner.name}</td>
                                <td class="py-3 px-4">${owner.contact}</td>
                                <td class="py-3 px-4">
                                    <div>Account: ${owner.bankAccount}</div>
                                    <div>IFSC: ${owner.ifscCode}</div>
                                </td>
                                <td class="py-3 px-4">
                                    <button onclick="app.editOwner('${owner.id}')" 
                                        class="text-blue-600 hover:text-blue-800 mr-2">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="app.deleteOwner('${owner.id}')" 
                                        class="text-red-600 hover:text-red-800">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    addOwner() {
        document.getElementById('content').innerHTML = `
            <div class="max-w-md mx-auto">
                <div class="mb-6 flex justify-between items-center">
                    <h2 class="text-2xl font-bold">Add Room Owner</h2>
                    <button onclick="app.showOwners()" 
                        class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                        Back to Owners
                    </button>
                </div>
                <form id="ownerForm" class="space-y-4">
                    <div>
                        <label class="block text-gray-700">Owner Name</label>
                        <input type="text" id="ownerName" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Contact Number</label>
                        <input type="tel" id="ownerContact" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Bank Account Number</label>
                        <input type="text" id="ownerAccount" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">IFSC Code</label>
                        <input type="text" id="ownerIfsc" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="flex space-x-4">
                        <button type="submit" 
                            class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                            Save
                        </button>
                        <button type="button" onclick="app.showOwners()"
                            class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.getElementById('ownerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveOwner(
                null, // new owner
                document.getElementById('ownerName').value,
                document.getElementById('ownerContact').value,
                document.getElementById('ownerAccount').value,
                document.getElementById('ownerIfsc').value
            );
        });
    }

    editOwner(ownerId) {
        const owner = this.owners.find(o => o.id === ownerId);
        if (!owner) return;

        document.getElementById('content').innerHTML = `
            <div class="max-w-md mx-auto">
                <h2 class="text-2xl font-bold mb-6">Edit Room Owner</h2>
                <form id="ownerForm" class="space-y-4">
                    <div>
                        <label class="block text-gray-700">Owner Name</label>
                        <input type="text" id="ownerName" value="${owner.name}" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Contact Number</label>
                        <input type="tel" id="ownerContact" value="${owner.contact}" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Bank Account Number</label>
                        <input type="text" id="ownerAccount" value="${owner.bankAccount}" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">IFSC Code</label>
                        <input type="text" id="ownerIfsc" value="${owner.ifscCode}" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="flex space-x-4">
                        <button type="submit" 
                            class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                            Update
                        </button>
                        <button type="button" onclick="app.showOwners()"
                            class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.getElementById('ownerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveOwner(
                ownerId,
                document.getElementById('ownerName').value,
                document.getElementById('ownerContact').value,
                document.getElementById('ownerAccount').value,
                document.getElementById('ownerIfsc').value
            );
        });
    }

    saveOwner(id, name, contact, bankAccount, ifscCode) {
        const ownerData = {
            id: id || Date.now().toString(),
            name,
            contact,
            bankAccount,
            ifscCode,
            updatedAt: new Date().toISOString()
        };

        if (id) {
            // Update existing owner
            const index = this.owners.findIndex(o => o.id === id);
            if (index !== -1) {
                this.owners[index] = ownerData;
            }
        } else {
            // Add new owner
            ownerData.createdAt = new Date().toISOString();
            this.owners.push(ownerData);
        }

        this.saveData();
        this.showOwners();
    }

    deleteOwner(ownerId) {
        if (confirm('Are you sure you want to delete this owner?')) {
            this.owners = this.owners.filter(o => o.id !== ownerId);
            this.saveData();
            this.showOwners();
        }
    }

    showRooms() {
        document.getElementById('content').innerHTML = `
            <div class="mb-6 flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold">Rooms</h2>
                    <p class="text-gray-500">${this.projectName}</p>
                </div>
                <div class="flex space-x-2">
                    <button onclick="app.showDashboard()" 
                        class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                        Back to Dashboard
                    </button>
                    <button onclick="app.addRoom()" 
                        class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                        Add Room
                    </button>
                </div>
            </div>
            
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="py-3 px-4 text-left">Room No</th>
                            <th class="py-3 px-4 text-left">Owner</th>
                            <th class="py-3 px-4 text-left">Type</th>
                            <th class="py-3 px-4 text-left">Period</th>
                            <th class="py-3 px-4 text-left">Rent</th>
                            <th class="py-3 px-4 text-left">Occupants</th>
                            <th class="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${this.rooms.map(room => {
                            const owner = this.owners.find(o => o.id === room.ownerId);
                            const occupants = room.workerIds.map(id => {
                                const worker = this.workers.find(w => w.id === id);
                                return worker ? worker.name : '';
                            }).filter(name => name).join(', ');
                            
                            return `
                                <tr>
                                    <td class="py-3 px-4">${room.roomNo}</td>
                                    <td class="py-3 px-4">${owner ? owner.name : 'N/A'}</td>
                                    <td class="py-3 px-4">${room.type}</td>
                                    <td class="py-3 px-4">
                                        ${new Date(room.periodFrom).toLocaleDateString()} to 
                                        ${new Date(room.periodTo).toLocaleDateString()}
                                        <div class="text-sm text-gray-500">
                                            ${room.periodDuration} months (₹${room.monthlyRent.toFixed(2)}/month)
                                        </div>
                                    </td>
                                    <td class="py-3 px-4">₹${room.rent}</td>
                                    <td class="py-3 px-4">${occupants || 'None'}</td>
                                    <td class="py-3 px-4">
                                        <button onclick="app.editRoom('${room.id}')" 
                                            class="text-blue-600 hover:text-blue-800 mr-2">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick="app.recordRoomPayment('${room.id}')"
                                            class="text-green-600 hover:text-green-800 mr-2">
                                            <i class="fas fa-rupee-sign"></i>
                                        </button>
                                        <button onclick="app.deleteRoom('${room.id}')" 
                                            class="text-red-600 hover:text-red-800">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    addRoom() {
        document.getElementById('content').innerHTML = `
            <div class="max-w-md mx-auto">
                <div class="mb-6 flex justify-between items-center">
                    <h2 class="text-2xl font-bold">Add Room</h2>
                    <button onclick="app.showRooms()" 
                        class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                        Back to Rooms
                    </button>
                </div>
                <form id="roomForm" class="space-y-4">
                    <div>
                        <label class="block text-gray-700">Room Number</label>
                        <input type="text" id="roomNo" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Owner</label>
                        <select id="roomOwner" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="">Select Owner</option>
                            ${this.owners.map(owner => `
                                <option value="${owner.id}">${owner.name}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700">Room Type</label>
                        <select id="roomType" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="Staff">Staff</option>
                            <option value="Worker">Worker</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700">Rent (₹)</label>
                        <input type="number" id="roomRent" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Assign Workers/Staff</label>
                        <select id="roomWorkers" multiple
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                            ${this.workers.map(worker => `
                                <option value="${worker.id}">${worker.name}</option>
                            `).join('')}
                        </select>
                        <p class="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                    </div>
                    <div class="flex space-x-4">
                        <button type="submit" 
                            class="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                            Save
                        </button>
                        <button type="button" onclick="app.showRooms()"
                            class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.getElementById('roomForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveRoom(
                null, // new room
                document.getElementById('roomNo').value,
                document.getElementById('roomOwner').value,
                document.getElementById('roomType').value,
                document.getElementById('periodFrom').value,
                document.getElementById('periodTo').value,
                document.getElementById('roomRent').value,
                Array.from(document.getElementById('roomWorkers').selectedOptions).map(opt => opt.value)
            );
        });
    }

    editRoom(roomId) {
        const room = this.rooms.find(r => r.id === roomId);
        if (!room) return;

        document.getElementById('content').innerHTML = `
            <div class="max-w-md mx-auto">
                <h2 class="text-2xl font-bold mb-6">Edit Room</h2>
                <form id="roomForm" class="space-y-4">
                    <div>
                        <label class="block text-gray-700">Room Number</label>
                        <input type="text" id="roomNo" value="${room.roomNo}" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Owner</label>
                        <select id="roomOwner" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="">Select Owner</option>
                            ${this.owners.map(owner => `
                                <option value="${owner.id}" ${owner.id === room.ownerId ? 'selected' : ''}>
                                    ${owner.name}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700">Room Type</label>
                        <select id="roomType" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="Staff" ${room.type === 'Staff' ? 'selected' : ''}>Staff</option>
                            <option value="Worker" ${room.type === 'Worker' ? 'selected' : ''}>Worker</option>
                            <option value="Other" ${room.type === 'Other' ? 'selected' : ''}>Other</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700">Period From</label>
                            <input type="date" id="periodFrom" value="${room.periodFrom}" required
                                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                        </div>
                        <div>
                            <label class="block text-gray-700">Period To</label>
                            <input type="date" id="periodTo" value="${room.periodTo}" required
                                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                        </div>
                    </div>
                    <div>
                        <label class="block text-gray-700">Rent (₹)</label>
                        <input type="number" id="roomRent" value="${room.rent}" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Assign Workers/Staff</label>
                        <select id="roomWorkers" multiple
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                            ${this.workers.map(worker => `
                                <option value="${worker.id}" ${room.workerIds.includes(worker.id) ? 'selected' : ''}>
                                    ${worker.name}
                                </option>
                            `).join('')}
                        </select>
                        <p class="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                    </div>
                    <div class="flex space-x-4">
                        <button type="submit" 
                            class="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                            Update
                        </button>
                        <button type="button" onclick="app.showRooms()"
                            class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.getElementById('roomForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveRoom(
                roomId,
                document.getElementById('roomNo').value,
                document.getElementById('roomOwner').value,
                document.getElementById('roomType').value,
                document.getElementById('periodFrom').value,
                document.getElementById('periodTo').value,
                document.getElementById('roomRent').value,
                Array.from(document.getElementById('roomWorkers').selectedOptions).map(opt => opt.value)
            );
        });
    }

    saveRoom(id, roomNo, ownerId, type, periodFrom, periodTo, rent, workerIds) {
        // Validate rent period
        if (new Date(periodFrom) >= new Date(periodTo)) {
            alert('Rent period "From" date must be before "To" date');
            return;
        }

        // Calculate duration in months
        const fromDate = new Date(periodFrom);
        const toDate = new Date(periodTo);
        const monthsDiff = (toDate.getFullYear() - fromDate.getFullYear()) * 12 + 
                          (toDate.getMonth() - fromDate.getMonth());
        
        const roomData = {
            id: id || Date.now().toString(),
            roomNo,
            ownerId,
            type,
            periodFrom,
            periodTo,
            periodDuration: monthsDiff,
            rent: parseFloat(rent),
            monthlyRent: parseFloat(rent) / Math.max(1, monthsDiff),
            workerIds,
            payments: [],
            electricityPayments: [],
            updatedAt: new Date().toISOString()
        };

        if (id) {
            // Update existing room
            const index = this.rooms.findIndex(r => r.id === id);
            if (index !== -1) {
                this.rooms[index] = roomData;
            }
        } else {
            // Add new room
            roomData.createdAt = new Date().toISOString();
            this.rooms.push(roomData);
        }

        this.saveData();
        this.showRooms();
    }

    deleteRoom(roomId) {
        if (confirm('Are you sure you want to delete this room?')) {
            this.rooms = this.rooms.filter(r => r.id !== roomId);
            this.saveData();
            this.showRooms();
        }
    }

    showWorkers() {
        document.getElementById('content').innerHTML = `
            <div class="mb-6 flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold">Workers/Staff</h2>
                    <p class="text-gray-500">${this.projectName}</p>
                </div>
                <div class="flex space-x-2">
                    <button onclick="app.showDashboard()" 
                        class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                        Back to Dashboard
                    </button>
                    <button onclick="app.addWorker()" 
                        class="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
                        Add Worker/Staff
                    </button>
                </div>
            </div>
            
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="py-3 px-4 text-left">Name</th>
                            <th class="py-3 px-4 text-left">Contact</th>
                            <th class="py-3 px-4 text-left">Type</th>
                            <th class="py-3 px-4 text-left">Assigned Room</th>
                            <th class="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${this.workers.map(worker => {
                            const assignedRooms = this.rooms.filter(r => r.workerIds.includes(worker.id));
                            return `
                                <tr>
                                    <td class="py-3 px-4">${worker.name}</td>
                                    <td class="py-3 px-4">${worker.contact}</td>
                                    <td class="py-3 px-4">${worker.type}</td>
                                    <td class="py-3 px-4">
                                        ${assignedRooms.length > 0 ? 
                                            assignedRooms.map(r => r.roomNo).join(', ') : 
                                            'Not assigned'}
                                        <button onclick="app.showAssignModal('${worker.id}')"
                                            class="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200">
                                            <i class="fas fa-edit mr-1"></i>Change
                                        </button>
                                    </td>
                                    <td class="py-3 px-4">
                                        <button onclick="app.editWorker('${worker.id}')" 
                                            class="text-blue-600 hover:text-blue-800 mr-2">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick="app.deleteWorker('${worker.id}')" 
                                            class="text-red-600 hover:text-red-800">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    showAssignModal(workerId) {
        const worker = this.workers.find(w => w.id === workerId);
        if (!worker) return;

        document.getElementById('content').insertAdjacentHTML('beforeend', `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white p-6 rounded-lg max-w-md w-full">
                    <h3 class="text-xl font-bold mb-4">Assign ${worker.name} to Rooms</h3>
                    <div class="space-y-4">
                        <label class="block text-gray-700">Available Rooms</label>
                        <select id="assignRooms" multiple
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            ${this.rooms.map(room => `
                                <option value="${room.id}" ${room.workerIds.includes(workerId) ? 'selected' : ''}>
                                    ${room.roomNo} (${room.type})
                                </option>
                            `).join('')}
                        </select>
                        <p class="text-sm text-gray-500">Hold Ctrl/Cmd to select multiple rooms</p>
                        <div class="flex space-x-4">
                            <button onclick="app.saveWorkerAssignment('${workerId}')"
                                class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                                Save
                            </button>
                            <button onclick="document.querySelector('.fixed').remove()"
                                class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    saveWorkerAssignment(workerId) {
        const select = document.getElementById('assignRooms');
        const selectedRoomIds = Array.from(select.selectedOptions).map(opt => opt.value);

        // Remove worker from all rooms first
        this.rooms.forEach(room => {
            room.workerIds = room.workerIds.filter(id => id !== workerId);
        });

        // Add to selected rooms
        selectedRoomIds.forEach(roomId => {
            const room = this.rooms.find(r => r.id === roomId);
            if (room) {
                room.workerIds.push(workerId);
            }
        });

        this.saveData();
        document.querySelector('.fixed').remove();
        this.showWorkers();
    }

    addWorker() {
        document.getElementById('content').innerHTML = `
            <div class="max-w-md mx-auto">
                <div class="mb-6 flex justify-between items-center">
                    <h2 class="text-2xl font-bold">Add Worker/Staff</h2>
                    <button onclick="app.showWorkers()" 
                        class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                        Back to Workers
                    </button>
                </div>
                <form id="workerForm" class="space-y-4">
                    <div>
                        <label class="block text-gray-700">Full Name</label>
                        <input type="text" id="workerName" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Contact Number</label>
                        <input type="tel" id="workerContact" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Type</label>
                        <select id="workerType" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option value="Staff">Staff</option>
                            <option value="Worker">Worker</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700">Assign to Room</label>
                        <select id="workerRoom"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option value="">Not assigned</option>
                            ${this.rooms.map(room => `
                                <option value="${room.id}">${room.roomNo} (${room.type})</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="flex space-x-4">
                        <button type="submit" 
                            class="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
                            Save
                        </button>
                        <button type="button" onclick="app.showWorkers()"
                            class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.getElementById('workerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveWorker(
                null, // new worker
                document.getElementById('workerName').value,
                document.getElementById('workerContact').value,
                document.getElementById('workerType').value,
                document.getElementById('workerRoom').value
            );
        });
    }

    editWorker(workerId) {
        const worker = this.workers.find(w => w.id === workerId);
        if (!worker) return;

        document.getElementById('content').innerHTML = `
            <div class="max-w-md mx-auto">
                <h2 class="text-2xl font-bold mb-6">Edit Worker/Staff</h2>
                <form id="workerForm" class="space-y-4">
                    <div>
                        <label class="block text-gray-700">Full Name</label>
                        <input type="text" id="workerName" value="${worker.name}" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Contact Number</label>
                        <input type="tel" id="workerContact" value="${worker.contact}" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Type</label>
                        <select id="workerType" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option value="Staff" ${worker.type === 'Staff' ? 'selected' : ''}>Staff</option>
                            <option value="Worker" ${worker.type === 'Worker' ? 'selected' : ''}>Worker</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700">Assign to Room</label>
                        <select id="workerRoom"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option value="">Not assigned</option>
                            ${this.rooms.map(room => {
                                const isAssigned = room.workerIds.includes(workerId);
                                return `
                                    <option value="${room.id}" ${isAssigned ? 'selected' : ''}>
                                        ${room.roomNo} (${room.type})
                                    </option>
                                `;
                            }).join('')}
                        </select>
                    </div>
                    <div class="flex space-x-4">
                        <button type="submit" 
                            class="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
                            Update
                        </button>
                        <button type="button" onclick="app.showWorkers()"
                            class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.getElementById('workerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveWorker(
                workerId,
                document.getElementById('workerName').value,
                document.getElementById('workerContact').value,
                document.getElementById('workerType').value,
                document.getElementById('workerRoom').value
            );
        });
    }

    saveWorker(id, name, contact, type, roomId) {
        const workerData = {
            id: id || Date.now().toString(),
            name,
            contact,
            type,
            updatedAt: new Date().toISOString()
        };

        // Remove worker from any previously assigned room
        this.rooms.forEach(room => {
            room.workerIds = room.workerIds.filter(wid => wid !== id);
        });

        // Add to new room if specified
        if (roomId) {
            const room = this.rooms.find(r => r.id === roomId);
            if (room) {
                room.workerIds.push(workerData.id);
            }
        }

        if (id) {
            // Update existing worker
            const index = this.workers.findIndex(w => w.id === id);
            if (index !== -1) {
                this.workers[index] = workerData;
            }
        } else {
            // Add new worker
            workerData.createdAt = new Date().toISOString();
            this.workers.push(workerData);
        }

        this.saveData();
        this.showWorkers();
    }

    deleteWorker(workerId) {
        if (confirm('Are you sure you want to delete this worker/staff?')) {
            // Remove from any assigned rooms first
            this.rooms.forEach(room => {
                room.workerIds = room.workerIds.filter(id => id !== workerId);
            });
            
            this.workers = this.workers.filter(w => w.id !== workerId);
            this.saveData();
            this.showWorkers();
        }
    }

    showUserManagement() {
        if (this.currentUser.role !== 'admin') {
            alert('Only admins can access user management');
            return;
        }

        document.getElementById('content').innerHTML = `
            <div class="mb-6 flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold">User Management</h2>
                    <p class="text-gray-500">${this.projectName}</p>
                </div>
                <div class="flex space-x-2">
                    <button onclick="app.showDashboard()" 
                        class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                        Back to Dashboard
                    </button>
                    <button onclick="app.showRegistration()" 
                        class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                        Add User
                    </button>
                </div>
            </div>
            
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="py-3 px-4 text-left">Name</th>
                            <th class="py-3 px-4 text-left">Email</th>
                            <th class="py-3 px-4 text-left">Role</th>
                            <th class="py-3 px-4 text-left">Status</th>
                            <th class="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${this.users.map(user => `
                            <tr>
                                <td class="py-3 px-4">${user.name}</td>
                                <td class="py-3 px-4">${user.email}</td>
                                <td class="py-3 px-4">${user.role}</td>
                                <td class="py-3 px-4">
                                    <span class="px-2 py-1 rounded-full text-xs ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                        ${user.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td class="py-3 px-4">
                                    <button onclick="app.editUser('${user.id}')" 
                                        class="text-blue-600 hover:text-blue-800 mr-2">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    ${user.id !== this.currentUser.id ? `
                                    <button onclick="app.toggleUserStatus('${user.id}')" 
                                        class="text-yellow-600 hover:text-yellow-800 mr-2">
                                        <i class="fas ${user.isActive ? 'fa-user-slash' : 'fa-user-check'}"></i>
                                    </button>
                                    ` : ''}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    showProfile() {
        document.getElementById('content').innerHTML = `
            <div class="max-w-md mx-auto">
                <h2 class="text-2xl font-bold mb-6">My Profile</h2>
                <form id="profileForm" class="space-y-4">
                    <div>
                        <label class="block text-gray-700">Full Name</label>
                        <input type="text" id="profileName" value="${this.currentUser.name}" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Email</label>
                        <input type="email" id="profileEmail" value="${this.currentUser.email}" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Contact Number</label>
                        <input type="tel" id="profileContact" value="${this.currentUser.contact}" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="flex space-x-4">
                        <button type="submit" 
                            class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                            Update Profile
                        </button>
                        <button type="button" onclick="app.showDashboard()"
                            class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.getElementById('profileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateProfile(
                document.getElementById('profileName').value,
                document.getElementById('profileEmail').value,
                document.getElementById('profileContact').value
            );
        });
    }

    updateProfile(name, email, contact) {
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            this.users[userIndex] = {
                ...this.users[userIndex],
                name,
                email,
                contact,
                updatedAt: new Date().toISOString()
            };
            this.currentUser = this.users[userIndex];
            this.saveData();
            alert('Profile updated successfully');
            this.showDashboard();
        }
    }

    editUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        document.getElementById('content').innerHTML = `
            <div class="max-w-md mx-auto">
                <h2 class="text-2xl font-bold mb-6">Edit User</h2>
                <form id="userForm" class="space-y-4">
                    <div>
                        <label class="block text-gray-700">Full Name</label>
                        <input type="text" id="userName" value="${user.name}" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Email</label>
                        <input type="email" id="userEmail" value="${user.email}" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Contact Number</label>
                        <input type="tel" id="userContact" value="${user.contact}" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">User Role</label>
                        <select id="userRole" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="staff" ${user.role === 'staff' ? 'selected' : ''}>Staff</option>
                            <option value="manager" ${user.role === 'manager' ? 'selected' : ''}>Manager</option>
                            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
                        </select>
                    </div>
                    <div class="flex space-x-4">
                        <button type="submit" 
                            class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                            Update User
                        </button>
                        <button type="button" onclick="app.showUserManagement()"
                            class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.getElementById('userForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateUser(
                user.id,
                document.getElementById('userName').value,
                document.getElementById('userEmail').value,
                document.getElementById('userContact').value,
                document.getElementById('userRole').value
            );
        });
    }

    updateUser(id, name, email, contact, role) {
        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex !== -1) {
            this.users[userIndex] = {
                ...this.users[userIndex],
                name,
                email,
                contact,
                role,
                updatedAt: new Date().toISOString()
            };
            this.saveData();
            alert('User updated successfully');
            this.showUserManagement();
        }
    }

    toggleUserStatus(userId) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            this.users[userIndex].isActive = !this.users[userIndex].isActive;
            this.users[userIndex].updatedAt = new Date().toISOString();
            this.saveData();
            this.showUserManagement();
        }
    }

    showPaymentManagement() {
        document.getElementById('content').innerHTML = `
            <div class="mb-6 flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold">Payment Management</h2>
                    <p class="text-gray-500">${this.projectName}</p>
                </div>
                <div class="flex space-x-2">
                    <button onclick="app.showDashboard()" 
                        class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                        Back to Dashboard
                    </button>
                    <button onclick="app.recordPayment()" 
                        class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                        Record Payment
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-semibold mb-4">Pending Rent</h3>
                    <div class="space-y-4">
                        ${this.rooms.map(room => {
                            const paid = room.payments?.reduce((sum, p) => sum + p.amount, 0) || 0;
                            const pending = room.rent - paid;
                            if (pending <= 0) return '';
                            return `
                                <div class="flex justify-between items-center p-3 bg-red-50 rounded">
                                    <span>Room ${room.roomNo}: ₹${pending}</span>
                                    <button onclick="app.recordRoomPayment('${room.id}')"
                                        class="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                                        Mark Paid
                                    </button>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-semibold mb-4">Recent Payments</h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead>
                                <tr class="border-b">
                                    <th class="text-left py-2">Room (Owner)</th>
                                    <th class="text-left py-2">Amount</th>
                                    <th class="text-left py-2">Paid Date</th>
                                    <th class="text-left py-2">For Month</th>
                                    <th class="text-left py-2">Type</th>
                                    <th class="text-left py-2">Method</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.rooms.flatMap(room => 
                                    (room.payments || []).map(payment => `
                                        <tr class="border-b">
                                        <td class="py-2">
                                            ${room.roomNo}<br>
                                            <span class="text-sm text-gray-500">
                                                ${this.owners.find(o => o.id === room.ownerId)?.name || 'No Owner'}
                                            </span>
                                        </td>
                                        <td class="py-2">
                                            ₹${payment.amount}${payment.electricityAmount ? ` (₹${payment.electricityAmount} Elec)` : ''}
                                        </td>
                                        <td class="py-2">${new Date(payment.date).toLocaleDateString()}</td>
                                        <td class="py-2">${payment.forMonth ? new Date(payment.forMonth).toLocaleDateString('en-US', {month: 'long', year: 'numeric'}) : '-'}</td>
                                        <td class="py-2">${payment.type || 'Rent'}</td>
                                        <td class="py-2">${payment.method || 'Cash'}</td>
                                        </tr>
                                    `)
                                ).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    recordPayment(roomId = null) {
        let room = null;
        if (roomId) {
            room = this.rooms.find(r => r.id === roomId);
            if (!room) return;
        }

        const roomsOptions = this.rooms.map(r => 
            `<option value="${r.id}" ${roomId === r.id ? 'selected' : ''}>` +
            `Room ${r.roomNo} (${this.owners.find(o => o.id === r.ownerId)?.name || 'No Owner'})` +
            `</option>`
        ).join('');

        const paid = room ? room.payments?.reduce((sum, p) => sum + p.amount, 0) || 0 : 0;
        const pending = room ? room.rent - paid : 0;

        document.getElementById('content').innerHTML = `
            <div class="max-w-md mx-auto">
                <div class="mb-6 flex justify-between items-center">
                    <h2 class="text-2xl font-bold">${room ? `Record Payment for Room ${room.roomNo}` : 'Record New Payment'}</h2>
                    <button onclick="${room ? 'app.showPaymentManagement()' : 'app.showDashboard()'}" 
                        class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                        ${room ? 'Back to Payments' : 'Back to Dashboard'}
                    </button>
                </div>
                
                <form id="paymentForm" class="space-y-4">
                    ${!roomId ? `
                    <div>
                        <label class="block text-gray-700">Select Room</label>
                        <select id="paymentRoom" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            ${roomsOptions}
                        </select>
                    </div>
                    ` : ''}
                    <div>
                        <label class="block text-gray-700">Amount (Pending: ₹${pending})</label>
                        <input type="number" id="paymentAmount" value="${pending}" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Payment Date</label>
                        <input type="date" id="paymentDate" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700">Period From</label>
                            <input type="date" id="paymentPeriodFrom" required
                                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-gray-700">Period To</label>
                            <input type="date" id="paymentPeriodTo" required
                                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                    </div>
                    <div>
                        <label class="block text-gray-700">Payment Type</label>
                        <select id="paymentType" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="rent">Rent Only</option>
                            <option value="rent_electricity">Rent + Electricity</option>
                            <option value="electricity">Electricity Only</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </div>
                    <div id="electricityFields" class="hidden">
                        <label class="block text-gray-700">Electricity Amount (₹)</label>
                        <input type="number" id="electricityAmount" value="0"
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    </div>
                    <div>
                        <label class="block text-gray-700">Payment Method</label>
                        <select id="paymentMethod" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="cash">Cash</option>
                            <option value="online">Online Payment</option>
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="cheque">Cheque</option>
                        </select>
                    </div>
                    <div class="flex space-x-4">
                        <button type="submit" 
                            class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                            Record Payment
                        </button>
                        <button type="button" onclick="app.showPaymentManagement()"
                            class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.getElementById('paymentType').addEventListener('change', (e) => {
            const electricityFields = document.getElementById('electricityFields');
            electricityFields.classList.toggle('hidden', e.target.value !== 'rent_electricity');
        });

        document.getElementById('paymentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const roomIdToUse = roomId || document.getElementById('paymentRoom').value;
            this.savePayment(
                roomIdToUse,
                parseFloat(document.getElementById('paymentAmount').value),
                document.getElementById('paymentDate').value,
                document.getElementById('paymentType').value
            );
        });
    }

    savePayment(roomId, amount, date, type) {
        const room = this.rooms.find(r => r.id === roomId);
        if (!room) return;

        if (!room.payments) room.payments = [];
            const paymentType = document.getElementById('paymentType').value;
            const electricityAmount = paymentType === 'rent_electricity' ? 
                parseFloat(document.getElementById('electricityAmount').value) : 0;
            
            if (paymentType === 'rent_electricity' || paymentType === 'electricity') {
                if (!room.electricityPayments) room.electricityPayments = [];
                room.electricityPayments.push({
                    id: Date.now(),
                    amount: electricityAmount,
                    date,
                    method: document.getElementById('paymentMethod').value,
                    recordedAt: new Date().toISOString()
                });
            }

            const paymentData = {
                id: Date.now(),
                amount: paymentType === 'electricity' ? 0 : amount,
                electricityAmount: paymentType === 'rent_electricity' ? electricityAmount : 0,
                date: date,
                periodFrom: document.getElementById('paymentPeriodFrom').value,
                periodTo: document.getElementById('paymentPeriodTo').value,
                type: paymentType,
                method: document.getElementById('paymentMethod').value,
                recordedAt: new Date().toISOString()
            };
            room.payments.push(paymentData);

        this.saveData();
        alert('Payment recorded successfully');
        this.showPaymentManagement();
    }

    showExpiringSoon() {
        const expiringRooms = this.rooms.filter(room => {
            const daysLeft = Math.floor((new Date(room.periodTo) - new Date()) / (1000 * 60 * 60 * 24));
            return daysLeft <= 7 && daysLeft >= 0;
        }).sort((a, b) => new Date(a.periodTo) - new Date(b.periodTo));

        document.getElementById('content').innerHTML = `
            <div class="mb-6 flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold">Rooms Expiring Soon (Next 7 Days)</h2>
                    <p class="text-gray-500">${this.projectName}</p>
                </div>
                <button onclick="app.showDashboard()" 
                    class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                    Back to Dashboard
                </button>
            </div>
            
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="py-3 px-4 text-left">Room No</th>
                            <th class="py-3 px-4 text-left">Owner</th>
                            <th class="py-3 px-4 text-left">Days Left</th>
                            <th class="py-3 px-4 text-left">Period End</th>
                            <th class="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${expiringRooms.map(room => {
                            const owner = this.owners.find(o => o.id === room.ownerId);
                            const daysLeft = Math.floor((new Date(room.periodTo) - new Date()) / (1000 * 60 * 60 * 24));
                            return `
                                <tr>
                                    <td class="py-3 px-4">${room.roomNo}</td>
                                    <td class="py-3 px-4">${owner ? owner.name : 'N/A'}</td>
                                    <td class="py-3 px-4 ${daysLeft <= 7 ? 'text-red-600 font-bold' : ''}">
                                        ${daysLeft} days
                                    </td>
                                    <td class="py-3 px-4">
                                        ${new Date(room.periodTo).toLocaleDateString()}
                                    </td>
                                    <td class="py-3 px-4">
                                        <button onclick="app.editRoom('${room.id}')" 
                                            class="text-blue-600 hover:text-blue-800 mr-2">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    showProjectSites() {
        document.getElementById('content').innerHTML = `
            <div class="mb-6 flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold">Project Sites</h2>
                    <p class="text-gray-500">${this.projectName}</p>
                </div>
                <div class="flex space-x-2">
                    <button onclick="app.showDashboard()" 
                        class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                        Back to Dashboard
                    </button>
                    <button onclick="app.addProjectSite()" 
                        class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                        Add Site
                    </button>
                </div>
            </div>
            
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="py-3 px-4 text-left">Code</th>
                            <th class="py-3 px-4 text-left">Site Name</th>
                            <th class="py-3 px-4 text-left">Address</th>
                            <th class="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        ${this.projectSites?.map(site => `
                            <tr>
                                <td class="py-3 px-4">${site.code}</td>
                                <td class="py-3 px-4">${site.name}</td>
                                <td class="py-3 px-4">${site.address}</td>
                                <td class="py-3 px-4">
                                    <button onclick="app.editProjectSite('${site.id}')" 
                                        class="text-blue-600 hover:text-blue-800 mr-2">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="app.deleteProjectSite('${site.id}')" 
                                        class="text-red-600 hover:text-red-800">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    addProjectSite() {
        document.getElementById('content').innerHTML = `
            <div class="max-w-md mx-auto">
                <div class="mb-6 flex justify-between items-center">
                    <h2 class="text-2xl font-bold">Add Project Site</h2>
                    <button onclick="app.showProjectSites()" 
                        class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                        Back to Sites
                    </button>
                </div>
                <form id="projectSiteForm" class="space-y-4">
                    <div>
                        <label class="block text-gray-700">Site Code</label>
                        <input type="text" id="siteCode" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. SITE-001">
                    </div>
                    <div>
                        <label class="block text-gray-700">Site Name</label>
                        <input type="text" id="siteName" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Address</label>
                        <textarea id="siteAddress" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                    <div class="flex space-x-4">
                        <button type="submit" 
                            class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                            Save Site
                        </button>
                        <button type="button" onclick="app.showProjectSites()"
                            class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.getElementById('projectSiteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProjectSite(
                null,
                document.getElementById('siteName').value,
                document.getElementById('siteAddress').value
            );
        });
    }

    editProjectSite(siteId) {
        const site = this.projectSites.find(s => s.id === siteId);
        if (!site) return;

        document.getElementById('content').innerHTML = `
            <div class="max-w-md mx-auto">
                <h2 class="text-2xl font-bold mb-6">Edit Project Site</h2>
                <form id="projectSiteForm" class="space-y-4">
                    <div>
                        <label class="block text-gray-700">Site Code</label>
                        <input type="text" id="siteCode" value="${site.code}" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. SITE-001">
                    </div>
                    <div>
                        <label class="block text-gray-700">Site Name</label>
                        <input type="text" id="siteName" value="${site.name}" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700">Address</label>
                        <textarea id="siteAddress" required
                            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">${site.address}</textarea>
                    </div>
                    <div class="flex space-x-4">
                        <button type="submit" 
                            class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                            Update Site
                        </button>
                        <button type="button" onclick="app.showProjectSites()"
                            class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.getElementById('projectSiteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProjectSite(
                siteId,
                document.getElementById('siteName').value,
                document.getElementById('siteAddress').value
            );
        });
    }

    saveProjectSite(id, name, address, contact) {
        const siteData = {
            id: id || Date.now().toString(),
            code: document.getElementById('siteCode').value,
            name,
            address,
            updatedAt: new Date().toISOString()
        };

        if (id) {
            const index = this.projectSites.findIndex(s => s.id === id);
            if (index !== -1) {
                this.projectSites[index] = siteData;
            }
        } else {
            siteData.createdAt = new Date().toISOString();
            this.projectSites.push(siteData);
        }

        this.saveData();
        this.showProjectSites();
    }

    showReports() {
        document.getElementById('content').innerHTML = `
            <div class="mb-6 flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold">Reports</h2>
                    <p class="text-gray-500">${this.projectName}</p>
                </div>
                <button onclick="app.showDashboard()" 
                    class="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                    Back to Dashboard
                </button>
            </div>

            <div class="mb-8 bg-white p-6 rounded-lg shadow">
                <h3 class="text-lg font-semibold mb-4">Summary Report</h3>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="font-medium text-blue-800">Total Rooms</h4>
                        <p class="text-2xl font-bold">${this.rooms.length}</p>
                    </div>
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h4 class="font-medium text-green-800">Active Owners</h4>
                        <p class="text-2xl font-bold">${this.owners.length}</p>
                    </div>
                    <div class="bg-yellow-50 p-4 rounded-lg">
                        <h4 class="font-medium text-yellow-800">Expiring Soon</h4>
                        <p class="text-2xl font-bold">${this.rooms.filter(r => {
                            const days = Math.floor((new Date(r.periodTo) - new Date())/(1000*60*60*24));
                            return days <= 7 && days >= 0;
                        }).length}</p>
                    </div>
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <h4 class="font-medium text-purple-800">Project Sites</h4>
                        <p class="text-2xl font-bold">${this.projectSites?.length || 0}</p>
                    </div>
                </div>
                <div class="mt-4 space-y-2">
                    <button onclick="app.exportToPDF('summary')"
                        class="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                        <i class="fas fa-file-pdf mr-2"></i> Export Summary to PDF
                    </button>
                    <button onclick="app.exportToExcel('summary')"
                        class="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                        <i class="fas fa-file-excel mr-2"></i> Export Summary to Excel
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-semibold mb-4">Room Owners Report</h3>
                    <div class="space-y-2">
                        <button onclick="app.exportToPDF('owners')"
                            class="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                            <i class="fas fa-file-pdf mr-2"></i> Export to PDF
                        </button>
                        <button onclick="app.exportToExcel('owners')"
                            class="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                            <i class="fas fa-file-excel mr-2"></i> Export to Excel
                        </button>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-semibold mb-4">Rooms Report</h3>
                    <div class="space-y-2">
                        <button onclick="app.exportToPDF('rooms')"
                            class="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                            <i class="fas fa-file-pdf mr-2"></i> Export to PDF
                        </button>
                        <button onclick="app.exportToExcel('rooms')"
                            class="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                            <i class="fas fa-file-excel mr-2"></i> Export to Excel
                        </button>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-semibold mb-4">Payments Report</h3>
                    <div class="space-y-2">
                        <button onclick="app.exportToPDF('payments')"
                            class="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                            <i class="fas fa-file-pdf mr-2"></i> Export to PDF
                        </button>
                        <button onclick="app.exportToExcel('payments')"
                            class="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                            <i class="fas fa-file-excel mr-2"></i> Export to Excel
                        </button>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-semibold mb-4">Project Sites Report</h3>
                    <div class="space-y-2">
                        <button onclick="app.exportToPDF('sites')"
                            class="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                            <i class="fas fa-file-pdf mr-2"></i> Export to PDF
                        </button>
                        <button onclick="app.exportToExcel('sites')"
                            class="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                            <i class="fas fa-file-excel mr-2"></i> Export to Excel
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    exportToPDF(reportType) {
        // Placeholder for PDF export functionality
        alert(`Generating ${reportType} PDF report...`);
        // In a real implementation, this would use a library like jsPDF
    }

    exportToExcel(reportType) {
        // Placeholder for Excel export functionality
        alert(`Generating ${reportType} Excel report...`);
        // In a real implementation, this would use a library like SheetJS
    }

    deleteProjectSite(siteId) {
        if (confirm('Are you sure you want to delete this project site?')) {
            this.projectSites = this.projectSites.filter(s => s.id !== siteId);
            this.saveData();
            this.showProjectSites();
        }
    }

    sendExpirationReminders() {
            const expiringRooms = this.rooms.filter(room => {
            const daysLeft = Math.floor((new Date(room.periodTo) - new Date()) / (1000 * 60 * 60 * 24));
            return daysLeft <= 7 && daysLeft >= 0;
        });

        if (expiringRooms.length === 0) {
            alert('No rooms are expiring in the next 7 days');
            return;
        }

        const ownerMessages = {};
        expiringRooms.forEach(room => {
            const owner = this.owners.find(o => o.id === room.ownerId);
            if (!owner) return;

            const daysLeft = Math.floor((new Date(room.periodTo) - new Date()) / (1000 * 60 * 60 * 24));
            if (!ownerMessages[owner.id]) {
                ownerMessages[owner.id] = {
                    owner,
                    rooms: []
                };
            }
            ownerMessages[owner.id].rooms.push({room, daysLeft});
        });

        // In a real app, this would send actual emails/SMS
        // Here we'll just show a summary
        let message = "The following expiration reminders would be sent:\n\n";
        Object.values(ownerMessages).forEach(({owner, rooms}) => {
            message += `To: ${owner.name} (${owner.contact})\n`;
            rooms.forEach(({room, daysLeft}) => {
                message += `- Room ${room.roomNo} expires in ${daysLeft} days (${new Date(room.periodTo).toLocaleDateString()})\n`;
            });
            message += "\n";
        });

        alert(message);
    }
}

// Initialize the application
const app = new RoomRentSystem();