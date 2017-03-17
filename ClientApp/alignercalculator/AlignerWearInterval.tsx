import * as React from 'react';

interface Props {
    wearInterval: number;
    onWearIntervalInputChange
}

export default class AlignerWearInterval extends React.Component<Props, any> {
    constructor(props : Props) {
        super(props);
        this.handleWearIntervalInputChange = this.handleWearIntervalInputChange.bind(this);
    }

    public render() {
        return (
            <div>
                <div>Wear interval:</div>
                <input
                    value = { this.props.wearInterval }
                    type="number"
                    onChange = { e => this.handleWearIntervalInputChange(e) } />
            </div>
        );
    }

    public handleWearIntervalInputChange(event: any) : void {
        this.props.onWearIntervalInputChange(event.target.value);
    }
}
