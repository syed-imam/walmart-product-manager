/**
 * Persist brand data
 * @param id
 * @param brandValue
 */


function saveBrandValue(name, brandValue){
    var brandData={name: name, newBrand: brandValue}
    $.ajax({
        method: "POST",
        url: "/update-brand-name",
        data: brandData
    })
        .done(function(res){
            $(".msg-modal").html("<h4>Brand Updated Successfully</h4>");
            $("#submitModal").modal();
        });
}

function manualQueryWalmart(){
    $.ajax({
        method: "POST",
        url: "/manual-walmart-search-api",
    }).done(function(res){
        if(res === "Success"){
            $(".msg-modal").html("<h4>Query Finished Successfully</h4>");
            $("#submitModal").modal();
        }
        else{
            $(".msg-modal").html("<h4>API Service not available at this time</h4>");
            $("#submitModal").modal();
        }
    });
}

