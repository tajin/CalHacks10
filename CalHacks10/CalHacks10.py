import reflex as rx

class FormState(rx.State):

    form_data: dict ={}

    def handle_submit(self, form_data: dict):
        """Handle the form submit."""
        self.form_data = form_data
def navbar():
    return rx.hstack(
        rx.hstack(
            rx.image(src="/budget-line-icon-logo-illustration-free-vector.svg", width="50px"),
            rx.heading("BudGetLife"),
        ),
        rx.spacer(),
        rx.menu(
            rx.menu_button("Menu"),
        ),
        position="fixed",
        width="100%",
        top="0px",
        z_index="5",
        padding_x="2em"
    )


def index():
    return rx.vstack(
        navbar(),
        rx.image(
            src="/image-2.svg", width="250px", height="350",),
        rx.form(
            rx.vstack(
                rx.input(
                    placeholder="             First Name",
                    id="first_name", #In future put First and Last in middle
                ),

                rx.input(
                    placeholder="             Last Name", id="  last_name"
                ),
                rx.button("Submit", bg="lightblue", color="black", size="sm"),
            ),
            on_submit=FormState.handle_submit,
        ),
        rx.divider(),
    )



app = rx.App()
app.add_page(index)
app.compile()
