var companies = ['Amazon', 'Microsoft', 'Flipkart', 'Google', 'Adobe', 'Samsung', 'Accolite', 'MakeMyTrip', 'Snapdeal', 'Paytm', 'Zoho', 'Walmart', 'Morgan Stanley', 'OYO Rooms', 'Goldman Sachs', 'FactSet', 'D-E-Shaw', 'SAP Labs', 'Ola Cabs', 'Hike', 'MAQ Software', 'Oracle', 'VMWare', 'Qualcomm', 'Intuit ', 'Cisco', 'Facebook', 'Visa', 'Directi', 'Linkedin', 'Payu', 'Yahoo', 'Wipro', 'Yatra.com', 'Belzabar', 'Salesforce', 'Housing.com', 'Teradata', 'Synopsys', 'BankBazaar', 'Codenation', 'Citrix', 'Mahindra Comviva', 'TCS', 'InMobi', '24*7 Innovation Labs', 'One97', 'Apple', 'Times Internet', 'Twitter', 'Veritas', 'PayPal', 'Tejas Network', 'Boomerang Commerce', 'Groupon', 'Nutanix', 'Brocade', 'InfoEdge', 'Myntra', 'ABCO', 'CouponDunia', 'Cognizant ', 'Atlassian', 'Lybrate', 'Amdocs', 'IgniteWorld ', 'OATS Systems', 'United Health Group', 'Opera', 'Oxigen Wallet', 'Juniper Networks', 'Nagarro', 'Quikr', 'Rockstand', 'TinyOwl', 'GreyOrange ', 'Streamoid Technologies', 'Infosys', 'MetLife', 'Moonfrog Labs', 'Philips', 'Drishti-Soft', 'GE', 'PropTiger', 'Polycom', 'Kritikal Solutions', 'Media.net ', 'BrowserStack', 'Zillious', 'Fab.com', 'Accenture', 'IBM', 'CarWale', 'Cadence India', 'Epic Systems', 'Grofers', 'Nvidia', 'Wooker', 'Monotype Solutions', 'Arcesium', 'Bloomberg', 'nearbuy', 'Sapient', 'Xome', 'Expedia', 'Tesco', 'Airtel', 'Citicorp', 'eBay', 'Netskope ', 'Kuliza', 'DE Shaw', 'Swiggy', 'Dell', 'Infinera', 'PlaySimple', 'Rivigo', 'Intel', 'Pubmatic', 'Vizury Interactive Solutions', 'Zycus', 'Jabong', 'Informatica', 'Unisys', 'Sprinklr', 'Medlife', 'Dunzo', 'Mobicip', 'Dailyhunt', 'National Instruments', 'Komli Media', 'Target Corporation', 'Junglee Games', 'Taxi4Sure', 'HSBC', 'Service Now', 'HCL', 'FreeCharge', 'Mallow Technologies', 'CGI', 'Zopper', 'redBus', 'KLA Tencor', 'Open Solutions', 'American Express', 'Practo', 'Bidgely', 'Uber', 'Yodlee Infotech', 'Code Brew', 'Cavisson System', 'HunanAsset', 'Motlay', 'Zomato', 'Freshokartz', 'Huawei', 'Knowlarity'];
var list = document.getElementById('comapanyName');

companies.forEach(function (item) {
    var option = document.createElement('option');
    option.value = item;
    option.text = item;
    list.appendChild(option);
});


let roundNumber = 1
let questionNumber = 1
let listQuestionByRound = [questionNumber];
let listCompanies = ["Facebook", "Amazon", "Adobe", "Google", "Netflix", "Paytm", "Microsoft"];

document.getElementById('addRound').addEventListener('click', function () {
    addRound(++roundNumber);
});

document.getElementById('addQuestion').addEventListener('click', function () {
    ++listQuestionByRound[roundNumber - 1];
    addQuestion(roundNumber);
});

const questionHtml = (questionNumber) => `<label for="question_${questionNumber}">Question ${questionNumber}</label>
<textarea class="form-control" id="question_${questionNumber}" rows="3"
    placeholder="Add question description"></textarea><br>`


const roundHtml = (roundNumber) => `<div id="round-${roundNumber}">
<label for="question_1">Round ${roundNumber}</label>
<div class="form-group">
    <label for="question_${listQuestionByRound[roundNumber - 1]}">Question ${listQuestionByRound[roundNumber - 1]}</label>
    <textarea class="form-control" id="question_${listQuestionByRound[roundNumber - 1]}" rows="3"
        placeholder="Add question description"></textarea>
</div>
</div> `

function createQuestion(questionNumber) {
    const div = document.createElement('div')
    div.innerHTML = questionHtml(listQuestionByRound[roundNumber - 1]);
    return div;
}

function addQuestion(roundNumber) {
    const ele = document.getElementById('round-' + roundNumber);
    ele.appendChild(createQuestion(listQuestionByRound[roundNumber - 1]));
}


function createRound(roundNumber) {
    const div = document.createElement('div')
    div.innerHTML = roundHtml(roundNumber);
    return div;
}

function addRound(roundNumber) {
    const ele = document.getElementById('round');
    listQuestionByRound.push(1);
    ele.appendChild(createRound(roundNumber));
}