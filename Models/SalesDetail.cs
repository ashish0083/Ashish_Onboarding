using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project1.Models;
[Table("sales_details")]

public partial class SalesDetail
{

    public string? Customer { get; set; }

    public string? Product { get; set; }

    public string? Store { get; set; }

    public DateTime DateSold { get; set; }

    public int Id { get; set; }
}
