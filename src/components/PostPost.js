import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// redex
import { connect } from 'react-redux';
import { postPost } from '../redux/actions/dataActions';

// mui 
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

// icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import MyButton from '../util/MyButton';

const styles = theme => ({
    ...theme.spreadThis,
    submitButton: {
        position: 'relative'
    },
    progressSpinner: {
        position:'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }

});


class PostPost extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '', open: false, errors: {} });
            this.handleClose();
        }
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false, errors: {} })
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.postPost({ body: this.state.body });
    }
    handleChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
        });
    };


    render() {
        const { errors } = this.state;
        const { classes, UI: { loading }} = this.props;

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="post">
                    <AddIcon />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>
                        Post Dialog
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="Post"
                                multiline
                                rows="3"
                                placeholder="Say something here"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange = {this.handleChange}
                                fullWidth/>
                            <Button     
                                type="submit" 
                                variant="contained" 
                                color="primary"
                                className={classes.submitButton}
                                disabled={loading}>
                                    Submit
                                    {loading && (
                                        <CircularProgress size={30} className={classes.progressSpinner}/>
                                    )}
                            </Button>
                        </form>
                    </DialogContent>

                </Dialog>
            </Fragment>
        )
    }
}

PostPost.propTypes = {
    postPost: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
})


export default connect(mapStateToProps, { postPost })(withStyles(styles)(PostPost))