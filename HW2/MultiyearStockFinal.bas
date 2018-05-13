Attribute VB_Name = "Module1"
Sub Vol():
    Dim ws As Worksheet
    Dim i As Long
    Dim j As Long
    Dim Last As Long
    Dim o As Double
    Dim c As Double
    Dim Vol As Double
    
    
    For Each ws In Worksheets
    
        Last = ws.Cells(Rows.Count, 1).End(xlUp).Row
        ws.Cells(1, 9).Value = "Ticker"
        ws.Cells(1, 10).Value = "Yearly Change"
        ws.Cells(1, 11).Value = "Percent Change"
        ws.Cells(1, 12).Value = "Total Stock Volume"
        ws.Cells(1, 16).Value = "Ticker"
        ws.Cells(1, 17).Value = "Value"
        ws.Cells(2, 15).Value = "Greatest % Increase"
        ws.Cells(3, 15).Value = "Greatest % Decrease"
        ws.Cells(4, 15).Value = "Greatest Total Volume"
        j = 2
        For i = 2 To Last
            
            If ws.Cells(i, 1).Value <> ws.Cells(i - 1, 1).Value Then
            
                o = ws.Cells(i, 3).Value
            
            
            ElseIf ws.Cells(i, 1).Value = ws.Cells(i + 1, 1).Value And o <> 0 Then
                
                Vol = Vol + ws.Cells(i + 1, 7).Value
                
            
            ElseIf ws.Cells(i, 1).Value <> ws.Cells(i + 1, 1).Value And o <> 0 Then
            
                c = ws.Cells(i, 6).Value
                ws.Cells(j, 10).Value = c - o
                    If ws.Cells(j, 10).Value > 0 Then
                        ws.Cells(j, 10).Interior.ColorIndex = 4
                    ElseIf ws.Cells(j, 10).Value < 0 Then
                        ws.Cells(j, 10).Interior.ColorIndex = 3
                    End If
                ws.Cells(j, 11).Value = ws.Cells(j, 10).Value / o
                ws.Cells(j, 11).NumberFormat = "0.00%"
                ws.Cells(j, 9).Value = ws.Cells(i, 1).Value
                ws.Cells(j, 12).Value = Vol
                If ws.Cells(j, 11).Value > ws.Cells(2, 17).Value Or IsEmpty(ws.Cells(2, 17).Value) = True Then
                    ws.Cells(2, 16).Value = ws.Cells(j, 9).Value
                    ws.Cells(2, 17).Value = ws.Cells(j, 11).Value
                End If
                If ws.Cells(j, 11).Value < ws.Cells(3, 17).Value Or IsEmpty(ws.Cells(3, 17).Value) = True Then
                    ws.Cells(3, 16).Value = ws.Cells(j, 9).Value
                    ws.Cells(3, 17).Value = ws.Cells(j, 11).Value
                End If
                If ws.Cells(j, 12).Value > ws.Cells(4, 17).Value Or IsEmpty(ws.Cells(4, 17).Value) = True Then
                    ws.Cells(4, 16).Value = ws.Cells(j, 9).Value
                    ws.Cells(4, 17).Value = ws.Cells(j, 12).Value
                End If
                j = j + 1
                Vol = ws.Cells(i + 1, 7).Value
                

            End If
            
            
        Next i
        
    Next ws
    
End Sub
