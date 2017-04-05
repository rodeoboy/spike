import * as React from 'react';
import {connect} from 'react-redux';


class AlignerGrid extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <div>
                <ul>
                    <li>{this.props.visitAligner.firstUpperAligner} - {this.props.visitAligner.lastUpperAligner}</li>
                    <li>{this.props.visitAligner.firstLowerAligner} - {this.props.visitAligner.lastLowerAligner}</li>
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        visitAligner: state.visitAligner
    };
}


 export default connect(
     mapStateToProps)
     (AlignerGrid);