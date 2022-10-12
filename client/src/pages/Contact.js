import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Contact = (props) => {
	const [login, { error }] = useMutation(LOGIN_USER);

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await login({
				// variables: { ...formState },
			});

			Auth.login(data.login.token);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<main className="flex-row justify-center mb-4">
			<div className="col-12 col-md-6">
				<div className="card">
					<div className="card-body">
						<form onSubmit={handleFormSubmit}>
							<h2>Get In Touch With Us</h2>
							<h3>Abokichi</h3>
							<p>
								<a href="https://abokichi.ca/">Abokichi Website</a>
							</p>
						</form>

						{error && <div>Login failed</div>}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Contact;
