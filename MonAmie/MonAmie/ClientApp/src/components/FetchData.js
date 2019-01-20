import React, { Component } from 'react';

export class FetchData extends Component {

    static renderCategoriesTable(categories) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Category ID</th>
                        <th>Category Name</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category =>
                        <tr key={category.categoryId}>
                            <td>{category.categoryId}</td>
                            <td>{category.categoryName}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    displayName = FetchData.name

    constructor(props) {
        super(props);
        this.state = { categories: [], loading: true };

        fetch('api/Category/GetAll')
            .then(response => response.json())
            .then(data => {
                this.setState({ categories: data, loading: false });
            });
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderCategoriesTable(this.state.categories);

        return (
            <div>
                <h1>Mon Amie Categories</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
}
