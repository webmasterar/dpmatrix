/*
 * @author Ahmad Retha
 * @date 12/06/2015
 * @license MIT
 */

function dpmatrix(element)
{
    var el = document.getElementById(element);
    var type = null;
    if(document.getElementsByName("type")[0].checked){type = 0;}
    else if(document.getElementsByName("type")[1].checked){type = 1;}
    else{type = 2;}
    var model = (document.getElementsByName("model")[0].checked) ? 0 : 1;
    var t = document.getElementById("t").value;
    var m = t.length;
    var x = document.getElementById("x").value;
    var n = x.length;
    var sub = parseInt(document.getElementById("sub").value);
    var ins = parseInt(document.getElementById("ins").value);
    var del = parseInt(document.getElementById("del").value);
    var mat = parseInt(document.getElementById("mat").value);
    
    if (type == 2) {
        if (sub > 0 || ins > 0 || del > 0 || mat <= 0) {
            alert("Use negative penalties and positive match for Smith-Waterman");
            return false;
        }
    }
    
    var i, j;

    //create rows of matrix
    var D0 = new Array(m + 1);
    if (type == 1) {
        D0[0] = 0;
        for (i = 1; i < m + 1; i++){D0[i] = D0[i - 1] + del;}
    } else {
        for (i = 0; i < m + 1; i++){D0[i] = 0;}
    }
    var D1 = new Array(m + 1);

    //create top row of table
    var s = "<table class=\"dpmatrix-table\"><tr><thead>";
    for (i = 0; i < m + 2; i++) {
        s += "<th scope=\"col\">";
        s += (i > 1) ? t[i - 2] : "&nbsp;";
        s += "</th>";
    }
    s += "</thead></tr>";

    //insert next row of matrix
    s += "<tbody><tr>";
    for (i = -1; i < m + 1; i++) {
        if (i == -1) {
            s += "<th scope=\"row\">&nbsp;</th>";
        } else {
            s += "<td>" + D0[i] + "</td>";
        }
    }
    s += "</tr>";

    //loop through t and x
    for (i = 1; i < n + 1; i++) {
        s += "<tr>";
        D1[0] = (type == 2) ? 0 : D0[0] + ins;

        for (j = -1; j < m + 1; j++) {
            if (j == -1) {
                s += "<th scope=\"row\">" + x[i - 1] + "</th>";
            } else if (j == 0) {
                s += "<td>" + D1[j] + "</td>";
            } else {
                if (model == 0) {
                    if (type == 0 || type == 1) {
                        D1[j] = Math.min(
                            D0[j - 1] + ((t[j - 1] == x[i - 1]) ? 0 : sub),
                            Math.min(
                                D0[j] + ins,
                                D1[j - 1] + del
                            )
                        );
                    } else {
                        D1[j] = Math.max(
                            0,
                            D0[j - 1] + ((t[j - 1] == x[i - 1]) ? mat : sub),
                            Math.max(
                                D0[j] + ins,
                                D1[j - 1] + del
                            )
                        )
                    }
                } else {
                    if (type == 0 || type == 1) {
                        D1[j] = D0[j - 1] + ((t[j - 1] == x[i - 1]) ? 0 : sub);
                    } else {
                        D1[j] = D0[j - 1] + ((t[j - 1] == x[i - 1]) ? mat : sub);
                    }
                }

                s += "<td>" + D1[j] + "</td>";
            }
        }

        //copy current row of matrix to previous one
        for (j = 0; j < m + 1; j++) {
            D0[j] = D1[j];
        }

        s += "</tr>";
    }

    //finish
    s += "</tbody></table>";

    el.innerHTML = s;

    return false;
}
