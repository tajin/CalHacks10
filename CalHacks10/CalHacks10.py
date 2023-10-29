import reflex as rx

class User(rx.Model, table=True):
    name: str
    cost: int

class FormState(rx.State):

    name: str
    users: list[User]

    def get_users(self):
        with rx.session() as session:
            self.users = session.query(User).filter(User.name.contains(self.name)).all()

    number: int
    form_data: dict = {}

    def handle_submit(self, form_data: dict):
        """Handle the form submit."""
        self.form_data = form_data

    def add_user(self):
        with rx.session() as session:
            session.add(User(name=self.name, cist=self.cost))
            session.commit()

def navbar():
    return rx.hstack(
        rx.hstack(
            rx.image(src="/budget-line-icon-logo-illustration-free-vector.jpg", width="50px"),
            rx.heading("Budget App"),
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
            src="/image-2.svg", width="250px", height="350"),
        rx.form(
            rx.vstack(
                rx.input(
                    placeholder="             First Name",
                    id="first_name", #In future put First and Last in middle
                ),

                rx.input(
                    placeholder="             Last Name", id="  last_name"
                ),
                rx.button("Submit", bg="lightblue", color="black", size="sm", on_click=rx.redirect("/budget_page"),),
            ),
            on_submit=FormState.handle_submit,
        ),
        rx.divider(),
    )

def budget():
    return rx.vstack(
        rx.text("Expenses"),
        rx.input(
            placeholder="Type to Search...",
            id="query",
        ),


        rx.divider(),

        rx.table_container(
            rx.table(
                headers=["Name", "Cost"],
                rows=[
                    ["Books", 30],
                    ["Crack", 5],
                    ["Food", 20],
                    ["Transport", 60],
                ],
                variant="striped",
            ),
        ),

        rx.divider(),

        rx.form(
            rx.vstack(
                rx.heading("Add Expenses"),
                rx.text(FormState.form_data.to_string()),
                rx.input(
                    placeholder="First Name",
                    id="first_name",
                ),
                rx.number_input(
                    on_change=FormState.set_number,
                    id="Cost",
                ),
                rx.button("Submit", type_="submit"),
            ),
            on_submit=FormState.handle_submit,
        ),
    )


app = rx.App()
app.add_page(index)
app.add_page(budget, route='/budget_page')
app.compile()
