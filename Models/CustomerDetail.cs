using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Project1.Models;

[Table("customer_details")]
public partial class CustomerDetail
{
    [Required(ErrorMessage = "Name is required.")]
    [Column("name")]
    [StringLength(20)]
    [Unicode(false)]
    public string? Name { get; set; }

    [Required(ErrorMessage = "Address is required.")]
    [Column("address")]
    [StringLength(255)]
    [Unicode(false)]
    public string? Address { get; set; }

    [Key]
    [Column("id")]
    public int Id { get; set; }
}
