import * as React from 'react';

interface Props {
    visitInterval: number;
    onVisitIntervalInputChange
}

export default class AlignerVisitInterval extends React.Component<Props, any> {
    constructor(props : Props) {
        super(props);
        this.handleVisitIntervalInputChange = this.handleVisitIntervalInputChange.bind(this);
    }

    public render() {
        return (
            <div>
                <div>Next visit interval:</div>
                <input
                    value = { this.props.visitInterval }
                    type="number"
                    onChange = { e => this.handleVisitIntervalInputChange(e) } />
            </div>
        );
    }

    public handleVisitIntervalInputChange(event: any) : void {
        this.props.onVisitIntervalInputChange(event.target.value);
    }
}
