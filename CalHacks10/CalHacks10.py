import reflex as rx

def index():
    return rx.text('BALLZ', font_size= '100px')

app = rx.App()
app.add_page(index)
app.compile()