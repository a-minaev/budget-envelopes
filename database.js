const Envelope = class {
    static id = 0;
    name;
    amount;

    constructor(name, amount){
        this.id = Envelope.id;
        this.name = name;
        this.amount = amount;

        Envelope.id += 1; 
    }

    getEnvelope(){
        return this;
    }

    addAmount(amount){
        if(this.checkAmountType(amount)){
            this.amount += Number(amount);
        }
    }

    withdrawAmount(amount){
        if(this.checkAmountType(amount)){
            if(this.amount<amount){
                throw new Error(`Insufficient funds in ${this.name}`);
            } else {
                this.amount -= Number(amount);
            }
        }
        
    }

    checkAmountType(amount){
        if(Number(amount)){
            return true;
        } else {
            throw new Error('Provided amount is not an integer');
        }
    }
};

const envelope1 = new Envelope('Groceries', 400);
const envelope2 = new Envelope('Rent', 1300);
const envelope3 = new Envelope('Bills', 600);
const envelope4 = new Envelope('Entertainment', 200);

const envelopeList = [envelope1, envelope2, envelope3, envelope4];


module.exports = envelopeList;