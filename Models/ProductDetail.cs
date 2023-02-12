using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Project1.Models;

[Table("product_details")]
public partial class ProductDetail
{
    [Column("name")]
    [StringLength(50)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    [Column("price")]
    [StringLength(50)]
    [Unicode(false)]
    public string Price { get; set; } = null!;

    [Key]
    [Column("id")]
    public int Id { get; set; }
}
