import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Table, Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { UsersErrors } from "./UsersErrors";
import { create, getAll, remove, update } from "../../services/UserService";
import "./Users.css";

class Users extends Component {
    state = {
        data: [],
        modalInsert: false,
        modalDelete: false,
        form: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        formErrors: { firstName: '', lastName: '', email: '', password: '' },
        modalType: '',
        firstNameValid: false,
        lastNameValid: false,
        emailValid: false,
        passwordValid: false,
        formValid: false
    }

    componentDidMount() {
        this.getUser();
    }

    selectUser = (user) => {
        this.setState({
            modalType: 'update',
            form: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password
            }
        })
    }

    getUser = () => {
        console.log("ANTES DE GET");
        getAll().then(response => {
            console.dir(response.data);
            this.setState({ data: response.data.users });
        }).catch(error => {
            console.log('ERROR GET', error);
        })
    }

    postUser = () => {
        create(this.state.form).then(response => {
            this.modalInsert();
            this.getUser();
        }).catch(error => {
            console.log('ERROR POST', error.message);
        });
    }

    putUser = () => {
        update(this.state.form.id, this.state.form).then(response => {
            this.modalInsert();
            this.getUser();
        }).catch(error => {
            console.log('ERROR PUT', error.message);
        });
    }

    deleteUser = () => {
        remove(this.state.form.id).then(response => {
            this.setState({ modalDelete: false });
            this.getUser();
        }).catch(error => {
            console.log('ERROR DELETE', error);
        });
    }

    modalInsert = () => {
        this.setState({ modalInsert: !this.state.modalInsert, validateForm: false });
    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
        this.validateField(e.target.name, e.target.value);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        
        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            case 'firstName':
                firstNameValid = value.length >= 1
                fieldValidationErrors.firstName = firstNameValid ? '' : ' required field';
                break;
            case 'lastName':
                lastNameValid = value.length >= 1
                fieldValidationErrors.lastName = lastNameValid ? '' : ' required field';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            firstNameValid: firstNameValid,
            lastNameValid: lastNameValid,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.firstNameValid && this.state.lastNameValid && this.state.emailValid && this.state.passwordValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    render() {
        const { form } = this.state;
        return (
            <>
            <Container>
                <br/>
                <Button color="success" onClick={() => { this.setState({ form: null, modalType: 'insert' }); this.modalInsert() }}>Add User</Button>
                <br/><br/>0
                <Table dark responsive>
                    <thead>
                        <tr className="theader">
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(user => {
                            return (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => { this.selectUser(user); this.modalInsert() }}><FontAwesomeIcon icon={faEdit} /></button>
                                        {"   "}
                                        <button className="btn btn-danger" onClick={() => { this.selectUser(user); this.setState({ modalDelete: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                </Container>

                <Modal isOpen={this.state.modalInsert}>
                    <ModalHeader style={{ display: 'block' } } className="btn-primary">
                        {
                            this.state.modalType === 'insert' ?
                                'Create User' : 'Update User'} <span style={{ float: 'right' }} onClick={() => this.modalInsert()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            {
                                this.state.modalType === 'update' ?
                                    <div>
                                        <label htmlFor="id">ID</label>
                                        <input disabled className="form-control" type="text" name="id" id="id" onChange={this.handleChange} value={form ? form.id : ''} /> </div> : <br />}
                            <div className={`form-group ${this.errorClass(this.state.formErrors.firstName)}`}>
                                <label htmlFor="firstName">First Name</label>
                                <input className="form-control" type="text" name="firstName" id="firstName" onChange={this.handleChange} value={form ? form.firstName : ''} />
                            </div>
                            <div className={`form-group ${this.errorClass(this.state.formErrors.lastName)}`}>
                                <label htmlFor="lastName">LastName</label>
                                <input className="form-control" type="text" name="lastName" id="lastName" onChange={this.handleChange} value={form ? form.lastName : ''} />
                            </div>
                            <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                                <label htmlFor="email">email</label>
                                <input className="form-control" type="email" name="email" id="email" onChange={this.handleChange} value={form ? form.email : ''} />
                            </div>
                            {
                                this.state.modalType === 'insert' ?
                                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                                        <label htmlFor="password">Password</label>
                                        <input className="form-control" type="password" name="password" id="password" onChange={this.handleChange} value={form ? form.password : ''} />
                                    </div> : <br />}
                            <div className="panel panel-default">
                                <UsersErrors userError={this.state.formErrors} />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {
                            this.state.modalType === 'insert' ?
                                <button className="btn btn-success" onClick={() => this.postUser()} disabled={!this.state.formValid}>
                                    Create
                                </button> : <button className="btn btn-primary" onClick={() => this.putUser() } >
                                    Update
                                </button>
                        }
                        <button className="btn btn-danger" onClick={() => this.modalInsert()}>Cancel</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalDelete}>
                    <ModalBody>
                        Are you sure delete the user {form && (form.firstName + ' ' + form.lastName) } ?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.deleteUser()}>Yes</button>
                        <button className="btn btn-secundary" onClick={() => this.setState({ modalDelete: false })}>No</button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}
export default Users;