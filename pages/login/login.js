document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const currentPath = window.location.pathname;

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const location = document.getElementById('location').value;
            const password = document.getElementById('password').value;

            // Validação básica
            if (!email || !location || !password) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            // Validação de senha
            if (password.length < 6) {
                alert('A senha deve ter pelo menos 6 caracteres.');
                return;
            }

            // Salva os dados do usuário
            const userData = {
                email,
                location,
                password: btoa(password), // Codifica a senha em base64 (apenas para demonstração)
                loginDate: new Date().toISOString()
            };

            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Redireciona para a página inicial
            window.location.href = '/index.html';
        });
    }

    // Verifica se o usuário já está logado
    const userData = localStorage.getItem('userData');
    if (userData && currentPath.includes('/login')) {
        const loginBox = document.querySelector('.login-box');
        if (loginBox) {
            loginBox.innerHTML = `
                <div class="logged-in-message">
                    <h2>Você já está logado!</h2>
                    <p>Email: ${JSON.parse(userData).email}</p>
                    <p>Localização: ${JSON.parse(userData).location}</p>
                    <button id="logoutButton" class="login-button">Sair</button>
                </div>
            `;

            document.getElementById('logoutButton').addEventListener('click', () => {
                localStorage.removeItem('userData');
                window.location.reload();
            });
        }
    }
}); 