import * as React from 'react';

interface Props {
    firstUpperAligner: number;
    lastUpperAligner: number;
    firstLowerAligner: number;
    lastLowerAligner: number;
    onFirstUpperAlignerInputChange;
    onLastUpperAlignerInputChange;
    onFirstLowerAlignerInputChange;
    onLastLowerAlignerInputChange;

}

export default class AlignerNumbers extends React.Component<Props, any> {
    constructor(props : Props) {
        super(props);
        this.handleFirstUpperAlignerInputChange = this.handleFirstUpperAlignerInputChange.bind(this);
        this.handleLastUpperAlignerInputChange = this.handleLastUpperAlignerInputChange.bind(this);
        this.handleFirstLowerAlignerInputChange = this.handleFirstLowerAlignerInputChange.bind(this);
        this.handleLastLowerAlignerInputChange = this.handleLastLowerAlignerInputChange.bind(this);
    }

    public render() {
        return (
            <div>
                <div>
                    <input
                        value = { this.props.firstUpperAligner }
                        type="number"
                        onChange = { e => this.handleFirstUpperAlignerInputChange(e) } />
                    <input
                        value = { this.props.lastUpperAligner }
                        type="number"
                        onChange = { e => this.handleLastUpperAlignerInputChange(e) } />
                </div>
                <div>
                    <input
                        value = { this.props.firstLowerAligner }
                        type="number"
                        onChange = { e => this.handleFirstLowerAlignerInputChange(e) } />
                    <input
                        value = { this.props.lastLowerAligner }
                        type="number"
                        onChange = { e => this.handleLastLowerAlignerInputChange(e) } />
                </div>
            </div>
        );
    }

    public handleFirstUpperAlignerInputChange(event: any) : void {
        this.props.onFirstUpperAlignerInputChange(event.target.value);
    }

    public handleLastUpperAlignerInputChange(event: any) : void {
        this.props.onLastUpperAlignerInputChange(event.target.value);
    }

    public handleFirstLowerAlignerInputChange(event: any) : void {
        this.props.onFirstLowerAlignerInputChange(event.target.value);
    }

    public handleLastLowerAlignerInputChange(event: any) : void {
        this.props.onLastLowerAlignerInputChange(event.target.value);
    }
}
