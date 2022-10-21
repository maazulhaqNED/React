let answers= []
function recordAnswer(qno, answer, nqno){
    answers[qno]=answer
    if(nqno>0){
        $(".question").removeClass('active');
        $(".q"+nqno).addClass('active');
    }
    else if(nqno==-1){
        $(".question").removeClass('active');
        $(".q1").addClass('active');
    }
    else{
        $(".question").removeClass('active');
        [,q1,q2,q3,q4,q5,q6,q7,q8,q9,q10]=answers
        
        if((q1,q2,q4,q8,q9,q6 == 1) && (q3,q5,q7,q10 == 1 || 2 )){
            $(".result1").addClass('active');
        }
        else if((q1,q2,q4 == 1) && (q3,q5,q6,q7,q8,q9,q10 == 1 || 2 )){
            $(".result2").addClass('active');
        }
        else{
            $(".result3").addClass('active');
        } 
    }

}