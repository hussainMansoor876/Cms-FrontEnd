/*eslint-disable*/
import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html'
import { Button, message } from 'antd'
import { connect } from 'react-redux'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './PostJob.css'
import htmlToText from 'html-to-text';
import * as jobMiddleware from '../../Store/middlewares/jobMiddleware'
import { countries, roles } from '../../Config/constants'

class PostJob extends Component {

    state = {
        editorState: EditorState.createEmpty(),
        rawHtml: "",
        jobTitle: "",
        location: countries[0].name,
        role: roles[0].position,
        loading: false,
        disabled: false,
        isError: false,
        successMessage: "",
        errorMessage: ""
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.isError) {
            this.setState({ isError: nextProps.isError, errorMessage: nextProps.errorMessage })
            message.error(nextProps.errorMessage)
            return
        }

        if (!nextProps.isError && !nextProps.isError) {
            this.setState({
                isError: nextProps.isError,
                successMessage: nextProps.successMessage,
                jobTitle: "",
                rawHtml: "",
                location: countries[0].name,
                role: roles[0].position,
                editorState: EditorState.createEmpty(),
                disabled: false
            })

            if (nextProps.successMessage) {
                message.success(nextProps.successMessage)
            }
        }
    }


    onEditorStateChange = (editorState) => {

        let contentState = editorState.getCurrentContent();
        let html = stateToHTML(contentState);

        const text = htmlToText.fromString(html, {
            wordwrap: 130
        });

        this.setState({
            editorState,
            rawHtml: text
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }


    handleSubmit = (e) => {
        e.preventDefault();
        const { jobTitle, location, role, rawHtml } = this.state
        this.setState({ loading: true, disabled: true })
        this.props.postJob({ jobTitle, location, role, rawHtml })
    }

    render() {
        const { editorState, jobTitle, location, role, disabled } = this.state

        return (
            <main role="main">
                <section className="panel">
                    <h2>Post A Job</h2>
                    <form  >
                        <div className="post-form" >
                            <label htmlFor="jobTitle">Job Title</label>
                            <input value={jobTitle} onChange={this.handleChange} type="text" name="jobTitle" id="jobTitle" placeholder="Need a MERN Developer" />
                            {/* Location */}
                            <label htmlFor="location">Location</label>
                            <select value={location} name="location" onChange={this.handleChange}>
                                {countries.map((item, idx) => (
                                    <option key={idx} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                            {/* Role */}
                            <label htmlFor="role">Role</label>
                            <select value={role} name="role" onChange={this.handleChange}>
                                {roles.map((item, idx) => (
                                    <option key={idx} value={item.position}>{item.position}</option>
                                ))}
                            </select>

                            <label htmlFor="textarea">Description</label>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="editor-toolbar"
                                wrapperClassName="editor-wrapper"
                                editorClassName="editor"
                                onEditorStateChange={this.onEditorStateChange}
                            />

                            <Button type="primary mt-2 w-100" disabled={disabled} onClick={this.handleSubmit}>Post</Button>

                        </div>


                    </form>
                </section>
            </main >
        )
    }
}



const mapStateToProps = (state) => {
    return {

        isLoading: state.jobs.isLoading,
        isError: state.jobs.isError,
        errorMessage: state.jobs.errorMessage,
        successMessage: state.jobs.successMessage,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postJob: (data) => {
            dispatch(jobMiddleware.postJob(data))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostJob)
