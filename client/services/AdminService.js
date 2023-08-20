class AdminService {
    baseUrl = 'http://localhost:3000';


    async createBook(title, author) {
        try {
            const data = {
                title: title,
                author: author
            };

            const response = await $.ajax({
                url: `${this.baseUrl}/admin/createBook`,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json'
            });

            return response;

        } catch (error) {
            console.log('Failed to create Book:', error);
        }
    }

    async deleteBook(bookID) {
        try {
            const response = await $.ajax({
                url: `${this.baseUrl}/admin/deleteBook/${bookID}`,
                type: 'DELETE'
            });

            return response;
        } catch (error) {
            console.log('Failed to delete book:', error);
        }
    }


    async changeBookPrice(bookID) {
        try {
            const response = await $.ajax({
                url: `${this.baseUrl}/admin/changeBookPrice/${bookID}`,
                type: 'GET'
            });

            return response;
        } catch (error) {
            console.log("Failed to change the book's price:", error);
        }
    }
}

window.AdminService = AdminService;