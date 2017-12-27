import React,{ Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchPost, deletePost } from "../actions/index";

class PostShow extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;        
        this.props.deletePost(id, () => this.props.history.push('/'));
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return (
                <div>Loading...</div>
            )
        }

        return (
            <div>
                <Link className="btn btn-link" to="/">
                    Back to the wall
                </Link>
                <button 
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}>
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return { post: state.posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);

