import * as React from 'react';

interface Props {
    // ...
    visitInterval: number;
}

export default class AlignerCalculator extends React.Component<Props, any> {
    constructor(props : Props) {
        super(props);

        this.state = { visitInterval: this.props.visitInterval};
    }

    public render() {
        return (
            <div>
                <div>Next visit interval:</div>
                <input
                    value = { this.state.visitInterval }
                    type="number"
                    onChange = { this.onBlurCalc } />
            </div>
        );
    }

    public onBlurCalc(event: any) : void {

        this.setState( { visitInterval : event.target.value } );
    }
}
