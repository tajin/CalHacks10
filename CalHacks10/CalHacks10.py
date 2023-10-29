import reflex as rx

class FormState(rx.State):

    form_data: dict = {}

    def handle_submit(self, form_data: dict):
        """Handle the form submit."""
        self.form_data = form_data


def index():
    return rx.vstack(
        rx.form(
            rx.vstack(
                rx.input(
                    placeholder="First name",
                    id="first_name",
                ),
                rx.input(
                    placeholder="Last Name", id="last_name"
                ),
                rx.button("Submit", type_="submit"),
            ),
            on_submit=FormState.handle_submit,
        ),
        rx.divider(),
        rx.heading("Test"),
        rx.text(FormState.form_data.to_string()),
    )
app = rx.App()
app.add_page(index)
app.compile()